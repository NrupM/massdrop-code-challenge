# Massdrop Code Challenge

This is a job queue application that exposes a REST API.

## Setup

run `npm install`

## Running

To run the application enter the command `nodemon` in the terminal.

## REST API

The REST API consists of two routes: the add route and the status route.

### Add Route

#### Input

A GET request with the input formatted as:

```
http://localhost:3000/scrape?urlParam={url}
```

### Status Route

#### Input

A GET request with the input formatted as:

```
http://localhost:3000/getJobById?jobId={_id}
```
