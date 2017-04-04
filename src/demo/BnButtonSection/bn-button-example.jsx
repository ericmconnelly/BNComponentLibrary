import React from 'react'

import { BnButton } from '../../lib'
import { registerComponent } from '../../lib'

export default function BnButtonDocsExample(props, context){
  const onMouseEnter = ({target}) => context.helperTextOpen(target, 'yp')
  const onMouseLeave = () => context.helperTextClose()

  return (
    <div className="docs-example">
      <div className="docs-canvas">
        <BnButton onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} marginRight4 icon="icon-circle-plus">Standard Button</BnButton>
        <BnButton notify marginRight4 >Notification</BnButton>
        <BnButton danger marginRight4 >Danger Button</BnButton>
        <BnButton dark marginRight4 tooltip="button with a tooltip">Dark Button</BnButton>
        <BnButton disabled marginRight4 >Disabled Button</BnButton>
        <div className="margin-top-12">
          <BnButton icon='icon-clipboard' iconOnly marginRight4 />
          <BnButton large marginRight4 >Large Button</BnButton>
          <BnButton noBg marginRight4 >No Background</BnButton>
          <BnButton primary marginRight4 >Primary Button</BnButton>
          <BnButton small marginRight4 >Small Button</BnButton>
        </div>
        <div className="margin-top-12">
          <BnButton primary large expand>Expanded Button</BnButton>
        </div>
      </div>
    </div>
  )
}

registerComponent(BnButtonDocsExample)
