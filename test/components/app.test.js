import { renderComponent, expect } from '../testHelper'
import Root from '../../src/containers/Root'

describe('Root', () => {
  let component

  beforeEach(() => {
    component = renderComponent(Root)
  })

  it('renders something', () => {
    expect(component).to.exist
  })
})
