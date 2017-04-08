'use strict';

var minimatch = require('minimatch');

module.exports = {
  obtainCategoryList: obtainCategoryList,
  filterAndSortLinks: filterAndSortLinks,
  isMatch: isMatch,
  mapPostCategory: mapPostCategory
};

function obtainCategoryList(posts) {
  var sitemapCategoryEntries = [];
  posts.toArray().forEach(function(item, index, allItems) {
    sitemapCategoryEntries = sitemapCategoryEntries.concat(mapPostCategory(item.categories, item));
  });

  return sitemapCategoryEntries;

}

function filterAndSortLinks(posts, pages, skipRenderList) {
  return [].concat(posts, pages)
        .filter(function(post) {
          return post.sitemap !== false && !isMatch(post.source, skipRenderList);
        })
        .sort(function(a, b) {
          return b.updated - a.updated;
        });
}

/**
 * This method returns true if the path should be filted.
 * @param {any} path the path
 * @param {any} patterns the patterns
 * @returns
 */
function isMatch(path, patterns) {
  if (!patterns) return false;
  if (!Array.isArray(patterns)) patterns = [patterns];
  if (!patterns.length) return false;

  for (var i = 0, len = patterns.length; i < len; i++) {
    if (minimatch(path, patterns[i])) return true;
  }

  return false;
}

function mapPostCategory(categories, post) {
  var result = [];
  var date = post.updated || post.date;
  categories.forEach(function(category, index, allCategories) {
    result.push({
      path: category.permalink,
      updated: date
    });
  });

  return result;
}
