/* import {create} from 'jss'
import reactJss from 'react-jss'
import vendorPrefixer from 'jss-vendor-prefixer'

export let jss = create()
export let useSheet = reactJss(jss)

jss.use(vendorPrefixer)*/

import objectAssign from 'object-assign'

// POSTS STYLES
const Posts = {
  ul: {
    paddingLeft: 0,
    listStyleType: 'none'
  },
  li: {
    marginBottom: 10
  },
  pinnedText: {
    fontSize: '.6em',
    fontWeight: 'bold',
    color: '#aaa'
  }
}

// POST STYLES
const Post = {
  article: {
    display: 'flex',
    flexDirection: 'column'
  },
  p: {
    marginTop: 0,
    marginBottom: 0,
    textAlign: 'left'
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, .8)',
    padding: '5px'
  },
  textBlock: {
    marginLeft: 10,
    textAlign: 'left',
    width: '95%'
  },
  link: {
    fontWeight: 700
  },
  socialButtons: {
    borderTop: '1px solid #ccc',
    display: 'flex',
    marginTop: '6px',
    fontSize: '.85em'
  },
  socialLink: {
    margin: '10px 15px 5px'
  },
  socialLinkActive: {
    color: '#39BBFF'
  },
  socialLinkInactive: {
    color: '#aaa'
  },
  thumbtack: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end'
  },
  pinned: {
    backgroundColor: 'rgba(255, 255, 255, .9)',
    border: '1px dotted rgba(0, 50, 100, .5)'
  },
  unpinned: {
    backgroundColor: 'rgba(255, 255, 255, .5)',
    border: 'none'
  },
  likeContainer: {
    height: 17,
    padding: '8px 5px 7px 80px',
    fontSize: '.85em',
    color: '#999',
    fontWeight: '500',
    display: 'flex'
  }
}

Post.body = objectAssign({}, Post.p)
Post.time = objectAssign({}, Post.p, {
  color: '#8899a6',
  fontSize: '85%'
})

// NEW POST STYLES
const NewPost = {
  form: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'stretch',
    justifyContent: 'flex-start'
  },
  textarea: {
    flexGrow: 1,
    marginRight: 12
  },
  button: {
    maxWidth: 75
  },
  remaining: {
    color: '#8899a6',
    lineHeight: 1.5
  },
  warning: {
    color: '#d40d12',
    lineHeight: 1.5
  }
}

export {
  Posts,
  Post,
  NewPost
}
