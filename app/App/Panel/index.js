import React from 'react'
import Restore from 'react-restore'
import svg from '../../svg'
import link from '../../link'

import Main from './Main'
import Local from './Local'
import Notify from './Notify'
import Badge from './Badge'

// import DevTools from 'restore-devtools'
// <DevTools />

const networks = { 1: 'Mainnet', 3: 'Ropsten', 4: 'Rinkeby', 42: 'Kovan' }

class Panel extends React.Component {
  indicator (connection) {
    const status = [connection.local.status, connection.secondary.status]
    if (status.indexOf('connected') > -1) {
      return <div className='panelDetailIndicatorInner panelDetailIndicatorGood' />
    } else {
      return <div className='panelDetailIndicatorInner panelDetailIndicatorBad' />
    }
  }

  render () {
    const open = this.store('tray.open')
    const expanded = this.store('dock.expand')
    // const selected = this.store('selected.open')
    const transform = open ? expanded ? 'translate3d(290px, 0px, 0px)' : 'translate3d(0px, 0px, 0px)' : 'translate3d(440px, 0px, 0px)' // open ? 'translate3d(0px, 0px, 0px)' : 'translate3d(370px, 0px, 0px)'
    const transition = '0.64s cubic-bezier(.82,0,.12,1) all'
    // const transitionDelay = open ? '0s' : '0.06s'
    // const transitionDelay = open ? '0.64s' : '0s'
    // const transitionDelay = open ? '0s' : '0.22s'
    return (
      <div id='panel' style={{ transform, transition }} onMouseDown={() => { if (expanded) link.rpc('toggleDock', () => {}) }}>
        <div className='panelSwoop'>{svg.swoop()}</div>
        <div className='panelSwoopBottom'>{svg.swoop()}</div>
        <div className={this.store('view.addAccount') ? 'panelMenu panelMenuAddMode' : 'panelMenu'}>
          <div className='panelDetail'>
            <div className='panelDetailIndicator'>
              {this.indicator(this.store('main.connection'))}
            </div>
            <div className='panelDetailText'>{networks[this.store('main.connection.network')]}</div>
          </div>
          <div className='panelMenuItem' style={this.store('panel.view') !== 'default' ? { transform: 'rotate(180deg)' } : {}} onMouseDown={() => this.store.toggleSettings()}>
            <span className='panelMenuIconArrow'>{svg.octicon('chevron-right', { height: 14 })}</span>
            <span className='panelMenuIconArrow'>{svg.octicon('chevron-right', { height: 14 })}</span>
            <span className='panelMenuIconArrow'>{svg.octicon('chevron-right', { height: 14 })}</span>
          </div>
        </div>
        <Local />
        <Main />
        <Notify />
        <Badge />
      </div>
    )
  }
}

export default Restore.connect(Panel)

// <span>{svg.octicon('kebab-horizontal', { height: 21 })}</span>
// <span className='panelMenuIconArrow'>{svg.octicon('chevron-right', { height: 16 })}</span>
