import { makeStyles, Theme } from "@material-ui/core";

export const useStepStyles = makeStyles((theme: Theme) => ({
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  mainInfoBlock: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "150px",
  },
  secondaryInfoBlock: {
    display: "flex",
    flexWrap: "wrap",
  },
  secondaryInfo: {
    display: "flex",
    alignItems: "center",
    width: "50%",
    margin: "7px 0",
    "& > svg": {
      marginRight: "8px",
    },
  },

  inputBlock: {
    marginTop: "25px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    "& > svg": {
      fontSize: "40px",
    },
  },
  input: {
    flex: 1,
  },

  error: {
    marginTop: '10px'
  },

  //  Settings style =====
  list: {
    width: '100%',
    height: '210px',
    overflow: 'auto'
  },
  list_dropping: {
    backgroundColor: '#9aadad',
  },
  listItemWrapper: {
    paddingBottom: "5px",
  },
  listItem: {
    backgroundColor: "#ccc"
  },
  emptyIcon: {
    margin: "10px auto",
    textAlign: "center",
    '& > svg': {
      fontSize: "30px",
    }
  }
}))