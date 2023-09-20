# viomba-coding-task

## Challenge

Write a programme which outputs into the console an intended tree structure listing of articles that are linked to a chosen article by following the links in the article.

Input:
	- The name of the English Wikipedia article where to start, for example, "Light"
	- The desired depth how deep the links are followed, for example "2"
	- How many first links are followed in each article, for example "3"

Example output for the above values:

``` 
> node .\index.mjs Light 2 3

Light
  Electromagnetic_radiation
    Linear_polarization
    Physics
    Electromagnetic_field
  Dispersive_prism
    Fused_quartz
    Ultraviolet
    Infrared
  Dispersion_(optics)
    Linear_response_function
    Electric_susceptibility
    Electromagnetic_spectrum#Visible_radiation_(light)
```

## Solution

### Key Decisions

- **Ignore Initial Divs**: The code is specifically designed to disregard any `div` elements with a `role` attribute set to `"note"` that appear before the first paragraph. This ensures that these elements, which are likely not primary content, do not interfere with the main purpose of the application.

- **URI Decoding**: All the links fetched have their URI encoded characters decoded back to their original form. This ensures that links are processed in their natural, readable form, especially when containing special characters.

- **Cyclic Link Prevention**: To avoid any potential infinite loops and make the output concise, cyclic links are not included in the final tree structure. A `visited` set is used to keep track of the articles that have already been processed.

**Note**: While creating this solution, I aimed to adhere to the given instructions and also applied logical reasoning to make certain decisions that would improve the program's functionality and user experience.


### Key Information

- **Main Entry Point:** `index.js`
- **Commands:** 
  - `npm test` - It appears no test has been specified for this project yet, as the command will throw an error.
  - `npm run build` - Compiles the TypeScript code using the TypeScript compiler.
- **Dependencies**:
  - `axios`: A popular HTTP client used for making requests.
  - `cheerio`: A fast, flexible, and lean implementation of core jQuery designed specifically for the server.
### Code Explanation

1. **Imports**: 
   - `axios` is used for fetching the content of the articles.
   - `cheerio` is used for parsing the fetched HTML data.

2. **Function: `getLinks`**: 
   - It's an asynchronous function that recursively fetches links from a Wikipedia article.
   - The depth specifies how deep the function should go when following links.
   - Limit determines how many links to fetch per article.
   - `visited` set keeps track of already visited articles to avoid cyclic reference.
   - The function fetches data from Wikipedia, then uses cheerio to parse the links from the article content.

3. **Function: `main`**: 
   - It's the main function that acts as the entry point.
   - Takes command line arguments to determine the starting article, depth, and limit.
   - If the provided arguments are not valid, the function outputs a usage hint.
   - Calls `getLinks` with the provided arguments.

4. **Execution**: 
   - The `main` function is invoked at the end. Any errors are caught and logged to the console.

### Setup:

Before running the application, make sure to:

1. Install all the required dependencies using `npm install`.
2. Transpile the TypeScript code using the provided build script: `npm run build`.
### Usage

To use the application, run it with Node providing three command-line arguments: the article name, depth, and limit. For example:

```shell
npm start "Node.js" 2 5
```

This will fetch links related to "Node.js" on Wikipedia, with a depth of 2 and a limit of 5 links per article.