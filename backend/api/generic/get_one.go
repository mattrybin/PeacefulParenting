package generic_handler

import (
	"database/sql"
	"errors"

	"github.com/gofiber/fiber/v2"
	"github.com/mattrybin/PeacefulParenting/backend/internal/utils"
)

func (h *GenericHandler) GetOne(c *fiber.Ctx, output interface{}) error {
	id := c.Params("id")
	result, err := h.genericStore.GetOne(h.resource, id, output)
	if errors.Is(err, sql.ErrNoRows) {
		return utils.ErrorMessage(c, fiber.StatusNotFound, "Question not found.")
	} else if err != nil {
		return utils.ErrorMessage(c, fiber.StatusInternalServerError, err.Error())
	}

	return c.Status(fiber.StatusOK).JSON(result)
}
