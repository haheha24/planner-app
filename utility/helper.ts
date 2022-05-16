import { Types } from "mongoose";

/**************** Validate a potential MongoDB ObjectId **************************/
/**
 * Uses mongoose validator for ObjectId but strings with a length of 12 pass
 * A string typecast to ObjectId is converted to a new ObjectId which would fail the following if statement
 * An ObjectId typecast as a new ObjectId will hold its current value, hence would return true, being equal and valid.
 * @param id An MongoDB ObjectId
 * @returns True if valid, false if not.
 */
export function isValidObjectId(id: string) {
  //MongoDB ObjectId validator
  if (Types.ObjectId.isValid(id)) {
    //Check against string of 12 length
    if (String(new Types.ObjectId(id)) === id) {
      return true;
    }
    return false;
  }
  return false;
}

/**************** Update Object **************************/
/**
 * Accepts two objects as arguments that have similarity in properties.
 * Keeps any properties in updateRequest that are present in currentQuery.
 * Keeps any properties in currentQuery that were not present in updateRequest.
 * @param updateRequest Object with updating props
 * @param currentQuery Object with current props to update
 * @returns a new object with updated props but does not inherit any properties from parent objects.
 */
export function updateObject<
  T extends object & Record<string, any>,
  K extends T
>(updateRequest: T, currentQuery: K) {
  //Initialise new object variable
  let updatedObject = {} as { [K in keyof T]: string };

  //Add new fields in
  for (let prop in updateRequest) {
    if (currentQuery.hasOwnProperty(prop)) {
      updatedObject[prop] = updateRequest[prop];
    }
  }

  //Add old fields that do not match new fields
  for (let prop in currentQuery) {
    if (updateRequest.hasOwnProperty(prop) === false) {
      updatedObject[prop] = currentQuery[prop];
    }
  }

  return updatedObject;
}
