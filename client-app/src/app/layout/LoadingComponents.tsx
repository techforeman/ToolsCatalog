import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

 const LoadingComponents: React.FC<{inverted?: boolean, content?:string}> = ({inverted, content}) => {
    return (
        <Dimmer active inverted={inverted = true}>
        <Loader content={content}/>
      </Dimmer>
    )
}
export default LoadingComponents
