import React from 'react'

export default function BnButtonDocsText(){
  const defaultButton = '<BnButton />'
  const dangerButton = '<BnButton danger />'
  const darkButton = '<BnButton dark />'
  const disabledButton = '<BnButton disabled />'
  const expandButton = '<BnButton expand />'
  const iconOnlyButton = '<BnButton iconOnly />'
  const largeButton = '<BnButton large />'
  const noBgButton = '<BnButton noBg />'
  const primaryButton = '<BnButton primary />'
  const smallButton = '<BnButton small />'
  const notifyButton = '<BnButton notify />'


  return (
    <div className="docs-text">
      <h3 id="all-button-options" className="docs">All Button Options</h3>
      <p className="docs">Support text, icons, or both. Use any combination of properties</p>
      <ul className="docs">
        <li className="docs"><code className="docs">{defaultButton}</code> Default</li>
        <li className="docs"><code className="docs">{dangerButton}</code> For confirming delete</li>
        <li className="docs"><code className="docs">{darkButton}</code> On dark backgrounds</li>
        <li className="docs"><code className="docs">{disabledButton}</code> disabled</li>
        <li className="docs"><code className="docs">{expandButton}</code> Full width, typically used in modal footers with <code className="docs">.large</code></li>
        <li className="docs"><code className="docs">{iconOnlyButton}</code> Square icon button</li>
        <li className="docs"><code className="docs">{largeButton}</code> Large Button</li>
        <li className="docs"><code className="docs">{noBgButton}</code> Provides hit target around icons</li>
        <li className="docs"><code className="docs">{primaryButton}</code> For submitting or creating</li>
        <li className="docs"><code className="docs">{smallButton}</code> Small buttons for footers</li>
        <li className="docs"><code className="docs">{notifyButton}</code> Notify badge on buttons</li>
      </ul>
    </div>
  )
}
