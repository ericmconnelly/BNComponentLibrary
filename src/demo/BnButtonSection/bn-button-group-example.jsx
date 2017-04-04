import React from 'react'

import { BnButton } from '../../lib'
import { BnButtonGroup } from '../../lib'
import { registerComponent } from '../../lib'

export default function BnButtonGroupDocsExample(props, context) {
  const fbClick = ({target}) => context.popoverOpen(target, <BnButtonGroup><BnButton iconOnly icon="icon-facebook"></BnButton></BnButtonGroup>)
  const igClick = ({target}) => context.popoverOpen(target, <BnButtonGroup><BnButton iconOnly icon="icon-instagram"></BnButton></BnButtonGroup>, 'top-right')
  
  return (
    <div className="docs-example">
      <div className="docs-canvas">
        <BnButtonGroup marginRight12>
          <BnButton>Left</BnButton>
          <BnButton>Middle</BnButton>
          <BnButton>Right</BnButton>
        </BnButtonGroup>
        <BnButtonGroup marginRight12 active>
          <BnButton iconOnly icon="icon-facebook"></BnButton>
          <BnButton iconOnly active icon="icon-twitter"></BnButton>
          <BnButton iconOnly icon="icon-instagram"></BnButton>
          <BnButton iconOnly icon="icon-pinterest"></BnButton>
        </BnButtonGroup>
        <BnButtonGroup>
          <BnButton onClick={fbClick} iconOnly>1</BnButton>
          <BnButton iconOnly active>2</BnButton>
          <BnButton iconOnly>3</BnButton>
          <BnButton onClick={igClick} iconOnly>4</BnButton>
        </BnButtonGroup>
      </div>
    </div>
  )
}

registerComponent(BnButtonGroupDocsExample)
