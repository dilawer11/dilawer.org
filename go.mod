module github.com/dilawer11/dilawer.org

replace (
	github.com/wowchemy/wowchemy-hugo-themes/modules/wowchemy-plugin-netlify => ./modules/wowchemy-plugin-netlify
	github.com/wowchemy/wowchemy-hugo-themes/modules/wowchemy-plugin-netlify-cms => ./modules/wowchemy-plugin-netlify-cms
	github.com/wowchemy/wowchemy-hugo-themes/modules/wowchemy-plugin-reveal => ./modules/wowchemy-plugin-reveal
	github.com/wowchemy/wowchemy-hugo-themes/modules/wowchemy/v5 => ./modules/wowchemy/
)

go 1.15

require (
	github.com/wowchemy/wowchemy-hugo-themes/modules/wowchemy-plugin-netlify v1.0.0 // indirect
	github.com/wowchemy/wowchemy-hugo-themes/modules/wowchemy-plugin-netlify-cms v1.0.0 // indirect
	github.com/wowchemy/wowchemy-hugo-themes/modules/wowchemy-plugin-reveal v1.0.0 // indirect
	github.com/wowchemy/wowchemy-hugo-themes/modules/wowchemy/v5 v5.6.0 // indirect
)
