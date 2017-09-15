import React from 'react'
import renderer from 'react-test-renderer'
import Notice from './index.js'

test('Notice Component', () => {
  const component = renderer.create(
    <Notice>
      <div>Hello world</div>
    </Notice>
  )
  const componentJSON = component.toJSON()

  expect(component).toMatchSnapshot()
  expect(componentJSON.children.length).toBe(1)
  expect(componentJSON.children[0].type).toBe('div')
  expect(componentJSON.children[0].children[0]).toContain('Hello world')
})
