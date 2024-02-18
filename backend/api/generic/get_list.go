package generic_handler

import (
	"database/sql"
	"errors"

	"github.com/gofiber/fiber/v2"
	"github.com/mattrybin/PeacefulParenting/backend/db"
	"github.com/mattrybin/PeacefulParenting/backend/internal/utils"
)

func (h *GenericHandler) GetList(c *fiber.Ctx, output interface{}) error {
	params := db.GetListParams{}
	// if err := c.BodyParser(&params); err != nil {
	// 	return err
	// }

	results, err := h.genericStore.GetList(h.resource, params, output)

	if errors.Is(err, sql.ErrNoRows) {
		return utils.ErrorMessage(c, fiber.StatusNotFound, "No records found")
	} else if err != nil {
		return utils.ErrorMessage(c, fiber.StatusInternalServerError, err.Error())
	}

	return c.Status(fiber.StatusOK).JSON(results)
}
