package routes

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/j1nxie/closure-api/v2/constants"
	"github.com/j1nxie/closure-api/v2/models"
)

func GetStatus(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	serverTime := time.Now().Format(time.RFC3339)
	version := constants.GetVersion()

	resp := models.SuccessResponse(models.StatusResponse{
		ServerTime: serverTime, Version: version,
	}, "SUCCESSFULLY_RETURNED_STATUS")

	err := json.NewEncoder(w).Encode(resp)

	if err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}
}
