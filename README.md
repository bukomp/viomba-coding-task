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

