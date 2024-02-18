package generic_handler

import (
	"testing"
)

func TestAdd(t *testing.T) {
	total := Add(4, 6)
	if total != 10 {
		t.Errorf("Sum was incorrect, got: %d, want: %d.", total, 10)
	}
}
