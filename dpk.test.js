const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKeyWithNoEvent", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
});

describe("deterministicPartitionKeyWithEventAndValidPartitionKeyInEvent", () => {
  it("Returns the partition key in event when it is present", () => {
    const partitionKey = deterministicPartitionKey({"partitionKey" : "test"});
    expect(partitionKey).toBe("test");
  });
});

describe("deterministicPartitionKeyWithEventAndInValidPartitionKey", () => {
  it("Returns the partition key in event when it is present", () => {
    const partitionKey = deterministicPartitionKey({"partitionKey" : "test"*256});
    expect(partitionKey).toBe("58540d4d440df8c6c6da0d79cfce715bc92953c6cde8be9f749790004ef2d5a7322d0fd5170eac9a37d57ee0cc975cfca068a60b01622529d9e0fd657f71b8e2");
  });
});

describe("deterministicPartitionKeyWithEventAndNoPartitionKey", () => {
  it("Returns the partition key in event when it is present", () => {
    const partitionKey = deterministicPartitionKey({"some" : "thing"});
    expect(partitionKey).toBe("93fb0f162ffb8635dc76a4749b2a38c0f9777ea0ed7c9c8f6e1a005c53146e27a258050f7e7502d027026016de6a94b6fd6ade9cb2397bdd03f61a17d5e32f4e");
  });
});

describe("deterministicPartitionKeyWithEventAndInValidPartitionKey", () => {
  it("Returns the partition key in event when it is present", () => {
    const partitionKey = deterministicPartitionKey({"partitionKey" : 256});
    expect(partitionKey).toBe("256");
  });
});
