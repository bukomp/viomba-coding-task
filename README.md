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

- **Ignore Initial Divs**: The code is specifically designed to disregard any `div` elements with a `role` attribute set to `"note"` that appear before the first paragraph (based on example). This ensures that these elements, which are likely not primary content, do not interfere with the main purpose of the application.

- **URI Decoding**: All the links fetched have their URI encoded characters decoded back to their original form. This ensures that links are processed in their natural, readable form, especially when containing special characters.

- **Cyclic Link Prevention**: To avoid any potential infinite loops and make the output concise, cyclic links are not included in the final tree structure. A `visited` set is used to keep track of the articles that have already been processed. 
Here is an example of an intended tree structure with a cyclic link removed:
```
Light
  Dispersive_prism

###
Following link is removed from the tree as it is cyclic link and will result in a loop.
###

    ### Dispersive_prism ### 
    Optics

###  
 Even though following link is cyclic, the link isn't removed. The link is found at the lowest level, and since links at this level aren't opened, it won't lead to an infinite loop. 
###
      
      ### Dispersive_prism ### 
      Index_of_physics_articles
      Outline_of_physics
    Prism_(optics)
      Optics
...
```



**Note**: While creating this solution, I aimed to adhere to the given instructions and also applied logical reasoning to make certain decisions that would improve the program's functionality and user experience.


### Key Information

- **Main Entry Point:** `index.js`
- **Commands:** 
  - `npm run build` - Compiles the TypeScript code using the TypeScript compiler.
  - `npm start` - Runs the compiled JavaScript code from the `dist/index.js` file.
- **Dependencies**:
  - `axios`: A popular HTTP client used for making requests.
  - `cheerio`: A fast, flexible, and lean implementation of core jQuery designed specifically for the server.

### Code Explanation

1. **Imports**: 
   - `axios` is used for fetching the content of the articles.
   - `cheerio` is used for parsing the fetched HTML data.

2. **Function: `getLinks`**: 
   - This is an asynchronous function that fetches and processes links from a given Wikipedia article.
   - It takes five parameters: `article`, `depth`, `limit`, `indentation`, and `visited`.
   - `article` is the name of the Wikipedia article from which to start fetching links.
   - `depth` is the number of levels to follow links. If `depth` is 0, the function will only print the current article. If `depth` is less than 0, the function will return without doing anything.
   - `limit` is the maximum number of links to fetch from each article.
   - `indentation` is a string used to indent the printed article names according to their depth level. It defaults to an empty string.
   - `visited` is a Set used to keep track of already visited articles to prevent cyclic references and repeated processing. It defaults to a new, empty Set.
   - The function first checks the `depth` parameter to determine whether to continue processing.
   - It then adds the current `article` to the `visited` set to avoid revisiting it in the future.
   - The function fetches the HTML content of the `article` from Wikipedia using `axios`, and loads it into `cheerio` for parsing.
   - It removes any `div` elements with a `role` attribute set to `"note"` that appear before the first paragraph.
   - It then finds all `a` elements (links) in the article content, and processes them according to the `limit` and `visited` set.
   - The function prints the current `article` name, indented according to its depth level.
   - Finally, it recursively calls itself for each unvisited link found, decreasing the `depth` by 1 and passing the updated `visited` set.

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