package models

type StatusResponse struct {
	ServerTime string `json:"server_time"`
	Version    string `json:"version"`
}
