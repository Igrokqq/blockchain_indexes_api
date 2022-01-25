export class GroupNotFoundError extends Error {
  constructor(message = 'Group not found') {
    super(message);
  }
}
export class IndexNotFoundError extends Error {
  constructor(message = 'Index not found') {
    super(message);
  }
}
export class BlockNotFoundError extends Error {
  constructor(message = 'Block not found') {
    super(message);
  }
}
