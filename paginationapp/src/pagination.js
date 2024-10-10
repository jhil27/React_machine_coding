import { useEffect, useState } from "react";
import './App.css';
function Pagination({ totalElement, itemsPerPage, getCurrentPage }) {
    const initialPagesCount = Math.ceil(totalElement / itemsPerPage);
    // console.log(initialPagesCount,totalElement,itemsPerPage)
    const [start, setStart] = useState(1);
    const [totalcount, setTotalCount] = useState(initialPagesCount);
    const [disablePrev, setDisablePrev] = useState(false);
    const [disableNext, setDisableNext] = useState(false);

    const calculatePagesCount = () => {
        let pageCount = Math.ceil(totalElement / itemsPerPage);
        setTotalCount(pageCount);
    }


    const pagelist = () => {
        let arr = []
        // console.log(totalcount)
        if (totalcount > 3) {
            for (let i = start; i < start + 3; i++) {
                arr.push(i);
            }
        }
        return arr;
    }


    const showButtonRange = (cond) => {
        console.log(totalcount)
        if (start + 3 <= totalcount && cond === 'nxt') {
            setStart(start + 3);
        }
        else if (start - 3 > 0 && cond === 'prv') {
            setStart(start - 3);
        }
    }


    const handleNext = () => {
        if (start + 1 <= totalcount) {
            showButtonRange('nxt');
            if (disablePrev) {
                setDisablePrev(false);
            }
            sendPageDetails(start + 3);
        }
        else {
            setDisableNext(true);
        }
    }


    const handlePrev = () => {
        if (start - 3 > 0) {
            showButtonRange('prv');
            if (disableNext) {
                setDisableNext(false);
            }
            sendPageDetails(start - 3);
        }
        else setDisablePrev(true);
    }


    const sendPageDetails = (currentPageNo) => {
        getCurrentPage(currentPageNo);
    }


    useEffect(() => {
        calculatePagesCount();
    }, [itemsPerPage, totalElement])


    return (
        < div className="pagination">
            <button className={!disablePrev ? "btn_pageNo" : "btn_pageNo_disabled"} disabled={disablePrev} onClick={handlePrev}>Previous</button>
            {pagelist().map((pageno) => {
                return <button className="btn_pageNo" key={'page_' + pageno} onClick={() => sendPageDetails(pageno)}>{pageno}</button>
            })
            }
            <button className={!disableNext ? "btn_pageNo" : "btn_pageNo_disabled"} disabled={disableNext} onClick={handleNext}>Next</button>
        </div >
    )
}

export default Pagination;