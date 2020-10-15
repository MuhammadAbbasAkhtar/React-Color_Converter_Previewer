import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";

const convert = require("color-convert");
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "40ch"
    }
  },
  colorBoxesContainer: {
    // border:'1px solid'
  },
  colorBox: {
    float: "left",
    height: 100,
    width: 100,
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius:3
  },
  colorCode: {
    verticalAlign: "middle",
    display: "block",
    textAlign: "center",
    flex: "0 0 120px",
    filter:'invert(100%)',
    "& > span":{
      fontWeight:400,
      fontSize:16
    }
  },
  exampleBtn: {
    width: 100,
    height: 10,
    fontSize: 12,
    padding: 15,
    marginLeft: theme.spacing(4)
  },
  legend: {
    display: "flex",
    justifyContent: "start"
  }
}));

function ColorBoxes(props) {
  const classes = useStyles();
  const { color } = props;
  return (
    <div className={classes.colorBox} style={{ backgroundColor: "#" + color }}>
      <span className={classes.colorCode}>
      <Typography variant="h6" component="span" >
        #{color}
      </Typography>
      </span>
    </div>
  );
}

const exampleInput =
  "[190,226,252]\n[84,181,252]\n[4,172,252]\n[4,132,252]\n[4,113,252]\n[4,156,252]\n[4,124,252]\n[4,164,252]\n[132,196,252]\n[4,148,252]\n[4,140,252]\n[48,160,252]\n[124,204,252]\n[28,148,252]\n[20,164,252]\n[20,124,252]\n[20,112,252]\n[36,184,252]\n[12,144,252]\n[12,156,252]\n";
export default function App() {
  const classes = useStyles();
  const [convertedCodes, setconvertedCodes] = React.useState(null);
  const [converted, setConverted] = React.useState(false);
  
  const [inputVal, setInputVal] = React.useState(" ");
  const handleBtnClick = () => {
    setConverted(false);
    setInputVal(exampleInput);
  };
  const handleChange = (event) => {
    setInputVal(event.target.value);
  };
  const handleSubmit = () => {
    setConverted(false);
   
    if (inputVal !== "") {
      let toconvert = inputVal.replace(/[\n]+/g, "-");
      toconvert = toconvert.split("-");
      var t = inputVal.replace(/[\[\]']+/g, "");

      setconvertedCodes(
        toconvert.map((v) => {
          const r = parseInt(v.split(",")[0]);
          const g = parseInt(v.split(",")[1]);
          const b = parseInt(v.split(",")[2]);
          return convert.rgb.hex(r, g, b);
        })
      );
      
      setInputVal(t);
      
      setConverted(true);
    }

   
  };

  

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Color Converter & Previewer
      </Typography>

      <div className={classes.legend}>
        <label>
          <Typography variant="body1" gutterBottom>
            Enter Color rgb array(s)
          </Typography>
        </label>
        <Button
          variant="contained"
          size="medium"
          className={classes.exampleBtn}
          onClick={handleBtnClick}>
          Example
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          className={classes.exampleBtn}
          onClick={handleSubmit}>
          Convert
        </Button>
      </div>
      <FormControl>
        <TextField
          id="outlined-multiline-static"
          label=""
          value={inputVal}
          multiline
          rows={15}
          onChange={handleChange}
          variant="outlined"
        />
      </FormControl>
      <div className={classes.colorBoxesContainer}>
        {converted &&
          convertedCodes.map((c, i) => {
            return <ColorBoxes color={c} key={i} />;
          })}
      </div>
    </div>
  );
}
