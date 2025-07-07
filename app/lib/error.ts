class StateError extends Error {
  constructor(
    public status: number,
    public statusText: string = "Error",
    message: string = "Unknown error"
  ) {
    super(message);
    this.name = "ValidationError";
  }
}

export { StateError };
