package models

type ClosureResponse[T any] struct {
	Description string `json:"description"`
	Body        T      `json:"body,omitempty"`
	Error       error  `json:"error,omitempty"`
}

func SuccessResponse[T any](body T, description string) ClosureResponse[T] {
	return ClosureResponse[T]{
		Description: description,
		Body:        body,
		Error:       nil,
	}
}

func ErrorResponse[T any](err error, description string) ClosureResponse[T] {
	var zero T

	return ClosureResponse[T]{
		Description: description,
		Body:        zero,
		Error:       err,
	}
}
