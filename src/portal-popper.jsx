import _ from 'lodash'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Popper from 'popper.js'
import PopperUtils from 'popper.js/dist/popper-utils.js'
import Portal from './portal'
import PropTypes from 'prop-types'

var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

const initialArrowProps = {
  left: 0,
  top: 0,
}

const initialPopperProps = {
  left: 0,
  position: 'absolute',
  top: 0,
}
Portal.idNum = 0

class PortalPopper extends Component {
  static propTypes = {
    placement: PropTypes.string.isRequired,
    getTargetNode: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
    wrapperClassName: PropTypes.string,
    ignoreScroll: PropTypes.bool
  }

  static defaultProps = {
    Popper,
    className: '',
    wrapperClassName: '',
  }

  constructor (...props) {
    super(...props)

    this.state = {
      arrowProps: initialArrowProps,
      popperProps: initialPopperProps,
    }
  }

    componentWillMount() {
      this.portalId = Portal.idNum++;
    }

  render () {
    const { className, placement, title, wrapperClassName } = this.props
    const prefix = _.last(className.split(' '))

      return ReactDOM.createPortal(<div
          id={`portal-${this.portalId}`}
          ref='popper'
          className={`${className} ${prefix}-${placement}`}
          style={this._getPortalStyle()}
      >
          <div ref={(node) => this.domNode = node} className={`${className}`} style={this._getPopperStyle()}>
              <span className={wrapperClassName}>{title}</span>
              <div
                  ref='arrow'
                  className={`${prefix}-arrow`}
                  style={this._getArrowStyle()}
              >
                  <svg xmlns='http://www.w3.org/2000/svg' version='1.1'>
                      <polygon points='5,0 10,5 5,10 0,5' />
                  </svg>
              </div>
          </div>
      </div>, document.body)
  }

  componentDidMount () {
    this.popper = new this.props.Popper(this.props.getTargetNode(), this.domNode, {
      content: this.props.title,
      placement: this.props.placement,
      modifiers: {
        applyStyle: {
          enabled: true,
          fn: (data, options) => {
              let styles = {
                  position: data.offsets.popper.position
              };

              let attributes = {
                  'x-placement': data.placement
              };

              let left = Math.round(data.offsets.popper.left);
              let top = Math.round(data.offsets.popper.top);

              let prefixedProperty = PopperUtils.getSupportedPropertyName('transform');
              if (options.gpuAcceleration && prefixedProperty) {
                  styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
                  if (this.props.ignoreScroll) {
                      styles.top = `${window.scrollY * -1}px`;
                      styles.left = `${window.scrollX * -1}px`;
                  } else {
                      styles.top = 0;
                      styles.left = 0;
                  }
                  styles.willChange = 'transform';
              } else {
                  if (this.props.ignoreScroll) {
                      styles.left = left - window.scrollX;
                      styles.top = top - window.scrollY;
                  } else {
                      styles.top = top;
                      styles.left = left;
                  }
                  styles.willChange = 'top, left';
              }

              PopperUtils.setStyles(data.instance.popper, _extends({}, styles, data.styles));
              PopperUtils.setAttributes(data.instance.popper, _extends({}, attributes, data.attributes));

              if (data.offsets.arrow) {
                  PopperUtils.setStyles(data.arrowElement, data.offsets.arrow);
              }

              return data;
          }
        },
        arrow: { element: this.refs.arrow },
      },
    })

    this.popper.onUpdate = (data) => {
      if (this.isUnmounted) return

      const newState = {}
      if (data.offsets.arrow) newState.arrowProps = data.offsets.arrow
      if (data.offsets.popper) newState.popperProps = data.offsets.popper
      this.setState(newState)
    }

    this.popper.update()
  }

  _getPopperStyle () {
    const left = Math.round(this.state.popperProps.left)
    const top = Math.round(this.state.popperProps.top)
    const transform = `translate3d(${left}px, ${top}px, 0)`

    return {
      position: this.state.popperProps.position,
      transform,
      WebkitTransform: transform,
    }
  }

    _getPortalStyle () {
        return {
            backgroundColor: 'transparent',
            border: 'none'
        }
    }

  _getArrowStyle () {
    const left = _.isNumber(this.state.arrowProps.left) ? Math.round(this.state.arrowProps.left) : null
    const top = _.isNumber(this.state.arrowProps.top) ? Math.round(this.state.arrowProps.top) : null

    return {
      left,
      top,
    }
  }

  componentWillUnmount () {
    this.isUnmounted = true
    this.popper && this.popper.destroy()
  }
}

export default PortalPopper
