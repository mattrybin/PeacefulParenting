package api

import (
	"database/sql"
	"errors"

	"github.com/gofiber/fiber/v2"
	"github.com/mattrybin/PeacefulParenting/backend/db"
	"github.com/mattrybin/PeacefulParenting/backend/internal/utils"
)

type GenericHandler struct {
	resource     string
	genericStore db.GenericDB
}

func NewGenericHandler(resource string, genericStore db.GenericDB) *GenericHandler {
	return &GenericHandler{
		resource:     resource,
		genericStore: genericStore,
	}
}

func (h *GenericHandler) GetOne(c *fiber.Ctx, output interface{}) error {
	id := c.Params("id")

	// question := types.Question{}
	result, err := h.genericStore.GetOne(h.resource, id, output)
	if errors.Is(err, sql.ErrNoRows) {
		return utils.ErrorMessage(c, fiber.StatusNotFound, questionNotFound)
	} else if err != nil {
		return utils.ErrorMessage(c, fiber.StatusInternalServerError, err.Error())
	}

	return c.Status(fiber.StatusOK).JSON(result)
}

// type Handler struct {
// 	client *sqlx.DB
// 	resource string
// }

// func genericHandler(client *sqlx.DB, resource string) *Handler {
// 	return &Handler{client, resource}
// }

// func (h *Handler) GetOne(client *sqlx.DB) error {
// 	return h.client.Status(fiber.StatusAccepted).JSON(question)
// }
