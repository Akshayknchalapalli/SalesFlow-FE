import { ChecklistIcon, DeleteIcon, FiberManualRecordIcon, HelpIcon, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Popover, Typography, useState } from "../../../utils/commonImports"

const ContactsAllFilterPopover = ({
  anchorElContact,
  handleClose,
  options,
  subOptions,
  handleAllFilterOptionClick,
}: {
  anchorElContact: HTMLElement | null;
  handleClose: () => void;
  options: { id: number; option: string }[];
  subOptions: { Status: [] } | any;
  handleAllFilterOptionClick: (option: string, subOption: string) => void;
}) => {
  const [nestedanchorElContact, setNestedanchorElContact] =
    useState<null | HTMLElement>(null);
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNestedPopoverOpen = (
    option: string,
    event: React.MouseEvent<HTMLElement>
  ) => {
    if (option !== "View All") {
      setSelectedOption(option);
      setNestedanchorElContact(event.currentTarget);
    } else {
      handleAllFilterOptionClick("", "");
    }
  };

  const handleNestedPopoverClose = () => {
    setNestedanchorElContact(null);
  };

  const handleSubOptionClick = (option: string, subOption: string) => {
    handleAllFilterOptionClick(option, subOption);
    handleNestedPopoverClose();
  };

  const getIconComponent = (option: any) => {
    switch (option) {
      case "Deleted":
        return <DeleteIcon />;
      case "View All":
        return <ChecklistIcon />;
      case "Status":
        return <HelpIcon />;
      default:
        return <FiberManualRecordIcon />;
    }
  };

  return (
    <>
      <Popover
        open={Boolean(anchorElContact)}
        anchorEl={anchorElContact}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <List>
          {options?.map((option) => (
            <ListItem
              key={option.id}
              onClick={(e: any) => handleNestedPopoverOpen(option?.option, e)}
              sx={{
                cursor: "pointer",
                padding: "0",
                margin: "0",
                height: "30px",
                fontSize: "14px",
                paddingRight: "5px",
              }}
            >
              <ListItem
                key={option.option}
                sx={{
                  cursor: "pointer",
                  padding: "0",
                  margin: "0",
                  height: "30px",
                  fontSize: "14px",
                }}
              >
                <ListItemButton
                  sx={{
                    cursor: "pointer",
                    padding: "0",
                    margin: "0",
                    height: "30px",
                    fontSize: "14px",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      cursor: "pointer",
                      padding: "0",
                      margin: "0",
                      width: "20px",
                      height: "20px",
                      transform: "scale(0.8)",
                      marginLeft: "5px",
                      paddingTop: "2px",
                    }}
                  >
                    {getIconComponent(option?.option)}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          cursor: "pointer",
                          fontSize: "14px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {option?.option}
                      </Typography>
                    }
                    sx={{
                      cursor: "pointer",
                      padding: "0",
                      margin: "0",
                      height: "30px",
                      transform: "scale(0.9)",
                      marginLeft: "-30px",
                      paddingTop: "3px",
                      minWidth: 0, // Ensure text doesn't create extra space
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </ListItem>
          ))}
        </List>
      </Popover>
      {selectedOption !== "View All" && (
        <Popover
          open={Boolean(nestedanchorElContact)}
          anchorEl={nestedanchorElContact}
          onClose={handleNestedPopoverClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <List>
            {(subOptions[selectedOption] || [])?.map((subOption: any) => (
              <ListItem
                key={subOption?.id}
                onClick={() =>
                  handleSubOptionClick(
                    selectedOption,
                    selectedOption === "Status"
                      ? String(subOption?.id)
                      : subOption?.option
                  )
                }
                sx={{
                  cursor: "pointer",
                  padding: "0",
                  margin: "0",
                  height: "30px",
                  fontSize: "14px",
                  paddingRight: "5px",
                }}
              >
                <ListItem
                  key={subOption?.option}
                  sx={{
                    cursor: "pointer",
                    padding: "0",
                    margin: "0",
                    height: "30px",
                    fontSize: "14px",
                  }}
                >
                  <ListItemButton
                    sx={{
                      cursor: "pointer",
                      padding: "0",
                      margin: "0",
                      height: "30px",
                      fontSize: "14px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        cursor: "pointer",
                        padding: "0",
                        margin: "0",
                        width: "20px",
                        height: "20px",
                        transform: "scale(0.9)",
                        marginLeft: "5px",
                        paddingTop: "2px",
                      }}
                    >
                      {getIconComponent(subOption?.option)}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            cursor: "pointer",
                            fontSize: "14px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {subOption?.option}
                        </Typography>
                      }
                      sx={{
                        cursor: "pointer",
                        padding: "0",
                        margin: "0",
                        height: "30px",
                        transform: "scale(0.9)",
                        marginLeft: "-30px",
                        paddingTop: "3px",
                        minWidth: 0, // Ensure text doesn't create extra space
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </ListItem>
            ))}
          </List>
        </Popover>
      )}
    </>
  );
};

export default ContactsAllFilterPopover;
