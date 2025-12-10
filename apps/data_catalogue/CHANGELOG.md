# data-catalogue

## 2.0.10
### Patch Changes

- fd9008e: add beta version notices
  clear search button

## 2.0.9
### Patch Changes

- d03cb8b: add checkbox

## 2.0.8
### Patch Changes

- 390b50f: trigger build

## 2.0.7
### Patch Changes

- beb25c7: bring back log, add exception to stop breaking

## 2.0.6
### Patch Changes

- 43491bb: fix question edit

## 2.0.5
### Patch Changes

- 06c0549: add exception if api cookie

## 2.0.4
### Patch Changes

- f6b6065: trigger build

## 2.0.3
### Patch Changes

- 1843025: trigger build

## 2.0.2
### Patch Changes

- 894dbf9: add db migrations and db service

## 2.0.1
### Patch Changes

- 4e742ba: fix build and dev issues

## 2.0.0
### Major Changes

- dc71a3a: This implements authentication and authorisation for the data catalogue. Previous instances will have to be redeployed from scratch as permissions are not bootstraped. File handling is improved with versioning but updating a file version is currently not implemented in the frontend. There is no JWT/Token authorisation. Scripts and variables must be updated before redeploying

### Minor Changes

- 78aa436: this completes the authentication flow. set up drizzle and db schema to register users and resources, initialises the implementation of authorisation, add admin settings pages

## 1.1.16
### Patch Changes

- 567dbfd: improve ui, add temp resolution, edit file format

## 1.1.15
### Patch Changes

- 3f475ff: fix filters to use the field they need, fix missing licenses on filter, select group on dataset creation

## 1.1.14
### Patch Changes

- 345d932: set the metadata fields at creation, remove the removal and adding of extra fields

## 1.1.13
### Patch Changes

- 64d7f08: trigger build

## 1.1.12
### Patch Changes

- c81657a: add favicon and apple only favicons, handle a bug on metadata activity stream if the dataset is undefined, refactor file upload and download, now the resource id endpoint handles the transformation of the url

## 1.1.11
### Patch Changes

- a86a03f: trigger release

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
