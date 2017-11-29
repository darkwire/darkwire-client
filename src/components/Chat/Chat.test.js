import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Chat } from './index.js'

const sendSocketMessage = jest.fn()

test('Chat Component', () => {
  const component = shallow(
    <Chat focusChat={false} userId="foo" username="user" showNotice={() => {}} clearActivities={() => {}} sendSocketMessage={sendSocketMessage} />
  )
  const componentJSON = toJson(component)

  expect(component).toMatchSnapshot()
  expect(componentJSON.children.length).toBe(2)
})
