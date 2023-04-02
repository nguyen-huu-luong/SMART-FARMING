import classname from 'classnames/bind'
import style from './Spin.module.scss'

const cx = classname.bind(style)

function Spin() {
    return ( <div className={cx("spin")}></div>  );
}

export default Spin;