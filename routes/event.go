package routes

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/PuerkitoBio/goquery"
	"github.com/j1nxie/closure-api/v2/models"
)

const BaseUrl string = "https://arknights.wiki.gg"

func parseForEvent(html *goquery.Selection) []models.Event {
	var events []models.Event

	html.Find("tr").Each(func(i int, tr *goquery.Selection) {
		server := tr.Find("div b").First().Text()

		tr.Find(".imagefit span").Each(func(j int, span *goquery.Selection) {
			eventName := span.Text()

			timeStr := tr.Find(".countdowndate").Eq(j).Text()

			layout := "2 January 2006 15:04 -0700"

			img := tr.Find("img").Eq(j).AttrOr("src", "")
			if img != "" {
				img = BaseUrl + img
			}

			t, err := time.Parse(layout, timeStr)
			if err != nil {
				return
			}

			event := models.Event{
				Server: server, Name: eventName, EndDate: t, ImageUrl: img,
			}

			events = append(events, event)
		})
	})

	return events
}

func ScrapeWiki() (*models.EventResponse, error) {
	res, err := http.Get(BaseUrl)

	if err != nil {
		log.Print(err)
		return nil, err
	}

	defer res.Body.Close()

	if res.StatusCode != 200 {
		log.Print("failed to fetch wiki")
		return nil, err
	}

	doc, err := goquery.NewDocumentFromReader(res.Body)

	if err != nil {
		log.Print(err)
		return nil, err
	}

	currentEvents := parseForEvent(doc.Find("div.mp-head:contains('Upcoming Events')").Prev())
	upcomingEvents := parseForEvent(doc.Find("div.mp-head:contains('Upcoming Events')").Next())

	eventResp := models.EventResponse{
		UpcomingEvents: upcomingEvents, CurrentEvents: currentEvents, FetchedAt: time.Now(),
	}

	return &eventResp, nil
}

func GetEvent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	eventResp, err := ScrapeWiki()

	if err != nil {
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}

	jsonErr := json.NewEncoder(w).Encode(models.SuccessResponse(eventResp, "SUCCESSFULLY_RETURNED_EVENTS"))

	if jsonErr != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}
}
