import { Fragment } from "react";
import { Link, Route, useParams, useRouteMatch } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import Comments from "../components/comments/Comments";
import HighlightedQuotes from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/hooks/use-http";
import { getSingleQuote } from "../lib/lib/api";

const QuoteDetail = () => {
  const param = useParams();
  const match = useRouteMatch();
  const { quoteId } = param;
  const { sendRequest, status, data:loadedQuotes, error} =useHttp(getSingleQuote, true);

  useEffect(()=>{
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if(status === 'pending'){
    return (
        <div className="centered">
            <LoadingSpinner />
        </div>
    )
}

if (error) {
    return <p className="centered focused">{error}</p>
}

if(!loadedQuotes.text){
  return<p>NO quote found!</p>
}

  // const quote = DUMMY_QOUTES.find((quote) => quote.id === param.quoteId);
  // if (!quote) {
  //   return <p>no Quote found</p>;
  // }

  return (
    <Fragment>
      <HighlightedQuotes text={loadedQuotes.text} author={loadedQuotes.author} />
      <Route path={`${match.path}`} exact>
        <div className="centered">
          <Link className='btn--flat' to={`${match.url}/comments`}>Load Comments</Link>
        </div>
      </Route>

      {/* <Route path="/quotes/:quoteId/comments"> */}
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
