# data-catalogue

## 1.1.10
### Patch Changes

- e9f0b51: trigger build

## 1.1.9
### Patch Changes

- e3a63c9: trigger build

## 1.1.8
### Patch Changes

- f6f1c6f: pass env variables to build

## 1.1.7
### Patch Changes

- f88761b: ready for alpha version 11/12/2025
  add get url from envs
  add page title
  fix resources padding on dataset page

## 1.1.6
### Patch Changes

- 044c42f: Add ping ckan instance, add tags create and delete, refactor to make context reactive to invalidation, add activity stream, add access expire and make input password
- e8131fc: adds tiptap as md editor, changes ui, adds new icons, remove heading, org filters and disables links until further notice

## 1.1.5
### Patch Changes

- 544829c: fix build

## 1.1.4
### Patch Changes

- fd192d7: build issues

## 1.1.3
### Patch Changes

- 7a8b314: Trigger build

## 1.1.2
### Patch Changes

- cffbad2: This will install sentry as a devdependency. Image will build but it wont build locally. To build locally it needs sentry as dependency but building the docker image as dependency will increase the image from 342MB to 1.4GB

## 1.1.1
### Patch Changes

- 31c0407: fix build by copying node modules from builder

## 1.1.0
### Minor Changes

- d4020b1: ##First docker image release:
  
  - Add dataset search page
  - Add dataset view page
  - Add dataset edit page
  - Add file storage with Azure
  - Handle signed urls for upload-download
  - Add create and edit handle metadata fields
  - Add auth flows for Ory Kratos
  - Add typed Ckan js client
  - Add invite only access
  - Build docker image with sentry

## 1.0.1
### Patch Changes

- 01e354e: Add functional search making use of ckan endpoints for solr. Will have to evaluate feature pairity with ckan /dataset and /search, and try implement the current functionality for search in our /datasets to enable filtering with the required/enabled filters.
  
  Also add resource page, match auth /login layout, add handling search params from client and on the server, improve ui.
- c305642: add pagination to dataset page, scroll available filters, improve ui of product page, breakdown product/dataset page into components, initial auth flows setup with ory

## 1.0.0
### Major Changes

- adca743: initial data catalogue build, improves to website, new components, adjust ts and eslint config
