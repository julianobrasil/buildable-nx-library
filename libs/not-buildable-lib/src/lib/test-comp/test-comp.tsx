import styles from './test-comp.module.scss'

/* eslint-disable-next-line */
export interface TestCompProps {
  name: string;
}

export function TestComp(props: TestCompProps) {
return <div className={styles['container']}>
      <h1>Welcome to TestJsx!</h1>
    </div>
}

export default TestComp;
