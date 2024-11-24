package models

import "time"

type Event struct {
	Name    string    `json:"name"`
	Server  string    `json:"server"`
	EndDate time.Time `json:"end_date"`
}

type EventResponse struct {
	CurrentEvents  []Event   `json:"current_events"`
	UpcomingEvents []Event   `json:"upcoming_events"`
	FetchedAt      time.Time `json:"fetched_at"`
}
