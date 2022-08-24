import express from 'express'
import _ from 'underscore'
import { tokenAuth, roleAuth } from '../middlewares/auth.js'

import Project from '../models/project.js'

const app = express()

export default app

app.get('/portfolio', (req, resp) => {
  console.log('portfolio endpoint active menor')
  resp.json({
    success: 'ok',
  })
})
