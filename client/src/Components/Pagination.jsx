import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setSubPages,
  prevSubPages,
  setPrevPivot,
  nxtSubPages,
  setNextPivot,
  nxtPage,
  specificPage,
  prevPage
} from "../Redux/actions/pages";
export default function Pagination({ currentPage, totalPagesToRender }) {
  const dispatch = useDispatch();

  const currentSubPage = useSelector((state) => state.paginate.currentSubPage);
  const indexes = useSelector((state) => state.paginate.indexes);
  const conditional = useSelector((state) => state.paginate.conditional);
  const renderSubPages = useSelector((state) => state.paginate.renderSubPages);

  useEffect(() => {
    dispatch(setSubPages());
  }, [indexes]);

  const previosPage = () => {
    if (currentPage === 1) return;
    if (currentPage === renderSubPages[0]) {
      dispatch(prevSubPages());
      dispatch(setPrevPivot());
      return;
    }
    dispatch(prevPage());
  };
  const nextPage = () => {
    if (currentPage === totalPagesToRender) return; //aca podria codear para renderizar la siguiente pag, o
    //los botoncitos de punticos
    if (currentPage === renderSubPages[renderSubPages.length - 1]) {
      dispatch(nxtSubPages());
      dispatch(setNextPivot());
      return;
    }
    dispatch(nxtPage());
  };
  const onSpecificPage = (page) => {
    dispatch(specificPage(page));
  };
  const previousSubPages = () => {
    if (currentSubPage === 1) return;
    dispatch(prevSubPages());
    dispatch(setNextPivot());
  };
  const nextSubPages = () => {
    if (conditional === currentSubPage) return;
    dispatch(nxtSubPages());
    dispatch(setNextPivot());
  };
  return (
    <div>
      <button onClick={previousSubPages}>{"<<"}</button>
      <button onClick={previosPage}>Prev</button>
      {currentPage>3? <h5>...</h5>: undefined}
      <ul>
        {renderSubPages.map((p) => (
          <li key={p}>
            <button onClick={() => onSpecificPage(p)} key={p}>
              {p}
            </button>
          </li>
        ))}
      </ul>
      {currentPage!==totalPagesToRender? <h5>...</h5>: undefined}
      <button onClick={nextPage}>Next</button>
      <button onClick={nextSubPages}>{">>"}</button>
    </div>
  );
}
