const crypto = require("crypto");

const getPartitionKeyFromEvent = (event) => {
    const MAX_PARTITION_KEY_LENGTH = 256;
    if(typeof event.partitionKey != "string") {
        event.partitionKey = JSON.stringify(event.partitionKey);
    }
    if (event.partitionKey < MAX_PARTITION_KEY_LENGTH) {
        return event.partitionKey;
    } else {
        return crypto.createHash("sha3-512").update(event.partitionKey).digest("hex");
    }
}

exports.deterministicPartitionKey = (event) => {
    const TRIVIAL_PARTITION_KEY = "0";

    if (event) {
        if (event.partitionKey) {
            return getPartitionKeyFromEvent(event);
        }
        return crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");
    }

    return TRIVIAL_PARTITION_KEY;
};
