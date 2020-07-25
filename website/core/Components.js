const React = require("react");
const PropTypes = require('prop-types')
const simpleComponent = (Component, baseClassName = '', mods = []) => {
    const SimpleComponent = props => {
        // Extra BEM modifiers, e.g. `Block__Container--reversed`
        const modClasses = []
        const otherProps = {}
        for (const prop in props) {
            if (mods.indexOf(prop) !== -1) {
                modClasses.push(`${baseClassName}--${prop}`)
            } else {
                otherProps[prop] = props[prop]
            }
        }

        return <Component {...otherProps} className={`${baseClassName} ${props.className || ''} ${modClasses}`}/>
    }
    SimpleComponent.displayName = `SimpleComponent(${Component}, ${baseClassName})`

    SimpleComponent.propTypes = {}
    for (const mod of mods) {
        SimpleComponent.propTypes[mod] = PropTypes.bool
    }

    return SimpleComponent
}

const Block = simpleComponent('section', 'Block', ['small']);
Block.Container = simpleComponent('div', 'Block__Container', ['reversed'])
Block.TitleBox = simpleComponent('h1', 'Block__TitleBox', ['large'])
Block.TextBox = simpleComponent('div', 'Block__TextBox', ['wide'])
Block.Title = simpleComponent('h1', 'Block__Title')
Block.Paragraph = simpleComponent('p', 'Block__Paragraph')
Block.LinkButton = simpleComponent('a', 'Block__LinkButton')
Block.QuoteContainer = simpleComponent('div', 'Block__QuoteContainer')
Block.Quote = simpleComponent('p', 'Block__Quote')
Block.Divider = simpleComponent('p', 'Block__Divider', ['quote'])
Block.MediaFrame = simpleComponent('div', 'Block__MediaFrame')
Block.Graphics = ({children}) => (
    <div className='Block__GraphicsContainer'>
        <div className='Block__Graphics' children={children}/>
    </div>
)
Block.Graphic = props => {
    /* Coordinates and size are in % of graphics container size, e.g. width={50} is 50% of parent width */
    const {x = 0, y = 0, width = 0, src, className = ''} = props
    const style = Object.assign({left: `${x}%`, top: `${y}%`, width: `${width}%`}, props.style)
    return <img src={src} alt="" {...props} style={style} className={`Block__Graphic ${className}`}/>
}

const ActionBlock = simpleComponent('section', 'ActionBlock')
ActionBlock.Title = simpleComponent('h1', 'ActionBlock__Title')
ActionBlock.Link = simpleComponent('a', 'ActionBlock__Link')

const Breakpoint = ({narrow, wide}) => (
    <React.Fragment>
      <div className='Breakpoint--narrow'>{narrow}</div>
      <div className='Breakpoint--wide'>{wide}</div>
    </React.Fragment>
)

module.exports = {
    Block,
    ActionBlock,
    Breakpoint
}
