/**
 * 路由过渡动画组件
 */
import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useLocation } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const useStyle = createUseStyles({
  root: {
    width: '100%',
    height: '100%',
  },
});

const RouterTransition = ({ children }) => {
  const classes = useStyle();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    isLoading ? NProgress.start() : NProgress.done();
  }, [isLoading]);

  return (
    <SwitchTransition>
      <CSSTransition
        key={location.key}
        unmountOnExit
        appear
        timeout={500}
        classNames="dg"
        onEnter={() => {
          setIsLoading(true);
        }}
        onEntered={() => {
          setIsLoading(false);
        }}
      >
        <div className={classes.root}>{children}</div>
      </CSSTransition>
    </SwitchTransition>
  );
};

export default RouterTransition;
