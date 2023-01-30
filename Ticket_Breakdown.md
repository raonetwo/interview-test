# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

- We would not like to break the existing schema or allow scope for potential conflicts in existing ids which will continue to work as primary key.
- We should also avoid changing exisiting API contract and should instead provide a new API to get shifts by custom ID.
- We can backfill the facility id to custom id. This will ensure something is always found for this custom id, in which can we can also make the new custom id as primary key.
- Above being said, keeping the ask in ticket in mind, following is the breakdown:

a. DataBase schema changes. (3-5 days)
1. Create a new attribute of custom facility Id with the new custom id as secondary key.
2. Backfill custom id from facility id. (This can be done in one shot if database is small or lazily as the requests arrive, in this approach, going with one shot with a small database assumption)
3. Update the custom id to be the primary key.

b. API changes. (5-8 days)
1. Create API for modifying custom ID in database. (3 days)
This API, will take existing facility Id and desired custom ID as input, search database to ensure no conflict exists i.e. no one else is using the desired customer Id and save it into the database.
2. Modify API for getShiftsByFacility to query on custom id as input. (3 days)
Instead of querying facility table with id, we now query with custom id, and get corresponding database if from the retrieved rows for further processing. Since we already did a backfill we have ensured this will work without any issue.
