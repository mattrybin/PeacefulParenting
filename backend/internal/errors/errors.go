package errors

import (
	"github.com/gofiber/fiber/v2"
)

type ResponseError struct {
	Success bool        `json:"success"`
	Data    interface{} `json:"data"`
	Message string      `json:"message"`
}

func HandleStatusNotFoundError(c *fiber.Ctx, message string) error {
	resErr := &ResponseError{
		Success: false,
		Data:    nil,
		Message: message,
	}
	if !resErr.Success {
		return c.Status(fiber.StatusNotFound).JSON(resErr)
	}
	return nil
}

func Message(c *fiber.Ctx, status int, msg string) error {
	return c.Status(status).JSON(fiber.Map{
		"error": true,
		"msg":   msg,
	})
}
