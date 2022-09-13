/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/","yt":"https://youtube.com/","dc":"https://discord.com/channels/@me","spfy":"https://open.spotify.com/","yugen":"https://yugen.to","9anime":"https://9anime.id/home","zoro":"https://zoro.to/home","shiro":"https://shiro.is/home","animix":"https://animixplay.to","pahe":"https://animepahe.com","ash":"https://ashanime.pro/home","anlst":"https://anilist.co/home","mal":"https://myanimelist.net","kitsu":"https://kitsu.io","simkl":"https://simkl.com/anime/","dex":"https://mangadex.org","cmkck":"https://comick.fun","mnwa":"https://manhuaplus.com","mreder":"https://mangareader.to","saw":"https://simplyaweeb.to"}
const engine = "searx"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
  searx: "https://www.serx.ml/search?q="
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"Cq4LWZb5Zb3IqEFr","label":"anime","bookmarks":[{"id":"Gcc2Kr1UM7fRB4tQ","label":"zoro","url":"https://zoro.to/home"},{"id":"rPj0BzCUgHlFhz4A","label":"shiro","url":"https://shiro.is/home"},{"id":"1GiMDs0P7qhINDQW","label":"9anime","url":"https://9anime.id/home"},{"id":"LXz6KHdJzWU24BVi","label":"simplyaweeb","url":"https://simplyaweeb.to"}]},{"id":"nFZEQIHeJvmMcLyB","label":"manga","bookmarks":[{"id":"zjTCTYth2xYtD3xN","label":"mangareader","url":"https://mangareader.to"},{"id":"392zTPQbHQnXiIJV","label":"mangadex","url":"https://mangadex.org"},{"id":"o5b4gpUdaMPwpOS4","label":"comick","url":"https://comick.fun"},{"id":"KJiv4dSHSCy3lz4V","label":"manhuaplus","url":"https://manhuaplus.com"}]},{"id":"xPJi3mVgSgWCY9Jp","label":"tracking","bookmarks":[{"id":"fqNW49t6okFWBAZE","label":"anilist","url":"https://anilist.co/home"},{"id":"WT1QLw9EHoXwNHd0","label":"myanimelist","url":"https://myanimelist.net/"},{"id":"0FE6wmDR4klFjqdE","label":"kitsu","url":"https://kitsu.io"},{"id":"ZEykyufzHVvrFL7g","label":"simkl","url":"https://simkl.com/anime/"}]},{"id":"7VEQCxEUCLdraIOI","label":"git","bookmarks":[{"id":"inyk6ED14Bg2fyfI","label":"github","url":"https://github.com"},{"id":"5FkDHsELgWUCbYpc","label":"gitlab","url":"https://gitlab.com"},{"id":"BuPu5ZzPHvxrLFAN","label":"codeberg","url":"https://codeberg.org"},{"id":"IQ2N9HJZjuW8WKNo","label":"bitbucket","url":"https://bitbucket.org"}]},{"id":"4oLX9sHcrDq1s1IF","label":"socials","bookmarks":[{"id":"Xy0WZahBSkgyKLHO","label":"youtube","url":"https://youtube.com"},{"id":"u5kzI7XUpRD3Vymo","label":"instagram","url":"https://instagram.com"},{"id":"EJyxZhG1qoDjGuMK","label":"discord","url":"https://discord.com/channels/@me"},{"id":"1WlzQiQZZ3KpaY9u","label":"reddit","url":"https://reddit.com"}]},{"id":"peepkP46zELqQscw","label":"music","bookmarks":[{"id":"CtKjtTQj7fjV8pM0","label":"youtube-music","url":"https://music.youtube.com"},{"id":"cLRYtPhFQl5GTrwi","label":"spotify","url":"https://open.spotify.com"},{"id":"wnYn353p7MeKd8pq","label":"listen","url":"https://listen.moe"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
