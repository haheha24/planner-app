import { isValidObjectId, updateObject } from "./helpers";

describe("Will test if string is a valid MongoDB ObjectId", () => {
  interface IObjectIdValidity {
    objectId: string;
    lessThan12: string;
    equalTo12: string;
    greaterThan12: string;
  }
  //ObjectId
  const objectIdValidity: IObjectIdValidity = {
    objectId: "6280dba07d09d2f0732f1c81",
    greaterThan12: "abc123def4567",
    lessThan12: "abc",
    equalTo12: "abc123def456",
  };

  test("argument is a valid ObjectId", () => {
    expect(isValidObjectId(objectIdValidity.objectId)).toBe(true);
  });
  test("invalid args passed as an ObjectId", () => {
    expect(isValidObjectId(objectIdValidity.greaterThan12)).toBe(false);
    expect(isValidObjectId(objectIdValidity.lessThan12)).toBe(false);
    expect(isValidObjectId(objectIdValidity.equalTo12)).toBe(false);
  });
});

describe("Test to update an object using updateObject function", () => {
  const gary = {
    name: "Gary",
    likes: "Walking on the beach",
    color: "Blue",
    job: "Mechanic",
  };
  const update = {
    name: "Gary The Mad",
    likes: "Being spontaneous",
    color: "Navy",
  };
  const garyTheMad = updateObject(update, gary);

  test("That the old props are updated with new values", () => {
    expect(garyTheMad).toHaveProperty("name", "Gary The Mad");
    expect(garyTheMad).not.toHaveProperty("name", "Gary");

    expect(garyTheMad).toHaveProperty("likes", "Being spontaneous");
    expect(garyTheMad).not.toHaveProperty("likes", "Walking on the beach");

    expect(garyTheMad).toHaveProperty("color", "Navy");
    expect(garyTheMad).not.toHaveProperty("color", "Blue");
  });

  test("That any of the old properties not updated remain", () => {
    expect(garyTheMad).toHaveProperty("job", "Mechanic");
  });
});
