package generic_handler

import (
	"github.com/mattrybin/PeacefulParenting/backend/db"
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
