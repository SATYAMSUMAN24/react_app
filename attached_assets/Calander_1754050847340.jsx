import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { BsGrid, BsList } from 'react-icons/bs';

// material
import {
  Card,
  Table,
  Stack,
  TableBody,
  Container,
  Typography,
  TableContainer,
  Grid,
  Tooltip,
  IconButton,
  Divider,
  Tabs,
  Tab,
  Button,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Icon,
  CardHeader,
  TableCell,
  tableCellClasses,
  Popover,
  Modal,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel
} from '@mui/material';
import { Box, minWidth, styled } from '@mui/system';
import Page from '../../components/Page';
import BrudCrumbs from '../../components/BreadCrumbs';
import PageTitle from '../../components/PageHeading';
import Scrollbar from '../../components/Scrollbar';
import { useEffect, useMemo, useRef, useState } from 'react';
import './ContinuousCalender.css';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import { FiEye } from 'react-icons/fi';
// import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import useUserStore from '../../store/userStore';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';

export default function NewCalenderLayout() {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      fontSize: 11,
      padding: '0 6px',
      height: '32px',
      fontWeight: 600,
      textTransform: 'capitalize !important',
      color: '#0d4689',
      minWidth: '150px'
      // border: '1px solid rgba(0, 0, 0, 0.125)'
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 11,
      padding: '0 6px',
      height: '32px',
      borderBottom: '1px solid #f1f3f4',
      minWidth: '150px'
    }
  }));
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  function ContinuousCalendar({ onClick }) {
    const today = new Date();
    const dayRefs = useRef([]);

    const [year, setYear] = useState(today.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(' ');
    const monthOptions = monthNames.map((month, index) => ({
      name: month,
      value: `${index}`
    }));
    const [selectedRegulation, setSelectedRegulation] = useState(' ');
    const scrollToDay = (monthIndex, dayIndex) => {
      const targetDayIndex = dayRefs.current.findIndex(
        (ref) =>
          ref &&
          ref.getAttribute('data-month') === `${monthIndex}` &&
          ref.getAttribute('data-day') === `${dayIndex}`
      );

      const targetElement = dayRefs.current[targetDayIndex];
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };

    const handlePrevYear = () => setYear((prevYear) => prevYear - 1);
    const handleNextYear = () => setYear((prevYear) => prevYear + 1);

    const handleMonthChange = (event) => {
      const monthIndex = parseInt(event.target.value, 10);
      setSelectedMonth(monthIndex);
      scrollToDay(monthIndex, 1);
    };

    const handleTodayClick = () => {
      setYear(today.getFullYear());
      scrollToDay(today.getMonth(), today.getDate());
      const monthIndex = parseInt(today.getMonth(), 10);
      setSelectedMonth(monthIndex);
    };

    useEffect(() => {
      handleTodayClick();
    }, []);

    const handleDayClick = (day, month, year) => {
      if (!onClick) return;
      onClick(day, month, year);
    };

    const events = [
      {
        id: 200,
        title: 'Form - II',
        startDate: '2025-02-71',
        endDate: '2025-03-03',
        stage: '#D32F2F',
        type: '#D97706'
      },
      {
        id: 1,
        title: 'PDs Compliance',
        startDate: '2025-03-01',
        endDate: '2025-03-03',
        stage: '#4CAF50',
        type: '#D97706'
      },
      {
        id: 2,
        title: 'Cards Statistics',
        startDate: '2025-03-05',
        endDate: '2025-03-05',
        stage: '#FFEB3B',
        type: '#3F51B5'
      },
      {
        id: 3,
        title: 'Prepaid Payment Instrument (PPI) Statistics	',
        startDate: '2025-03-10',
        endDate: '2025-03-10',
        stage: '#FFEB3B',
        type: '#D97706'
      },
      {
        id: 4,
        title: 'Conference Compliance',
        startDate: '2025-02-19',
        endDate: '2025-03-17',
        stage: '#4CAF50',
        type: '#FF5722'
      },
      {
        id: 5,
        title: 'Mobile Banking Transactions	',
        startDate: '2025-02-17',
        endDate: '2025-03-21',
        stage: '#2196F3',
        type: '#D97706'
      },
      {
        id: 5,
        title: 'Compliance with CRR and SLR',
        startDate: '2025-02-22',
        endDate: '2025-03-21',
        stage: '#D32F2F',
        type: '#FF5722'
      },
      {
        id: 10,
        title: 'Form - B',
        startDate: '2025-02-27',
        endDate: '2025-03-21',
        stage: '#2196F3',
        type: '#3F51B5'
      },
      {
        id: 99,
        title: 'Liabilities and Core Assets',
        startDate: '2025-02-26',
        endDate: '2025-03-21',
        stage: '#4CAF50',
        type: '#D97706'
      },
      {
        id: 993,
        title: 'Form - I',
        startDate: '2025-02-25',
        endDate: '2025-03-21',
        stage: '#F44336',
        type: '#3F51B5'
      },
      {
        id: 6,
        title: 'Payment Instrument Statistics',
        startDate: '2025-02-14',
        endDate: '2025-03-26',
        stage: '#F44336',
        type: '#FF5722'
      },
      {
        id: 26,
        title: 'Government Debt Relief Schemes',
        startDate: '2025-02-25',
        endDate: '2025-02-28',
        stage: '#4CAF50',
        type: '#9E9E9E'
      },

      {
        id: 266,
        title: 'Credit Schemes',
        startDate: '2025-02-25',
        endDate: '2025-02-28',
        stage: '#2196F3',
        type: '#3F51B5'
      },
      {
        id: 277,
        title: 'Compliance Debt Schemes',
        startDate: '2025-02-25',
        endDate: '2025-02-28',
        stage: '#2196F3',
        type: '#9E9E9E'
      },
      {
        id: 27,
        title: 'Small Value Loans',
        startDate: '2025-02-03',
        endDate: '2025-03-26',
        stage: '#4CAF50',
        type: '#FFEB3B'
      },
      {
        id: 28,
        title: 'Priority Sector Lending (PSL) ',
        startDate: '2025-03-08',
        endDate: '2025-03-26',
        stage: '#F44336',
        type: '#D32F2F'
      }
    ];

    const generateCalendar = useMemo(() => {
      const today = new Date();

      const daysInYear = (month, day) => {
        const daysInYear = [];
        const startDayOfWeek = new Date(year, 0, 1).getDay();

        if (startDayOfWeek < 6) {
          for (let i = 0; i < startDayOfWeek; i++) {
            daysInYear.push({ month: -1, day: 32 - startDayOfWeek + i });
          }
        }

        for (let month = 0; month < 12; month++) {
          const daysInMonth = new Date(year, month + 1, 0).getDate();

          for (let day = 1; day <= daysInMonth; day++) {
            daysInYear.push({ month, day });
          }
        }

        const lastWeekDayCount = daysInYear.length % 7;
        if (lastWeekDayCount > 0) {
          const extraDaysNeeded = 7 - lastWeekDayCount;
          for (let day = 1; day <= extraDaysNeeded; day++) {
            daysInYear.push({ month: 0, day });
          }
        }

        return daysInYear;
      };

      const calendarDays = daysInYear();

      const calendarWeeks = [];
      for (let i = 0; i < calendarDays.length; i += 7) {
        calendarWeeks.push(calendarDays.slice(i, i + 7));
      }

      const calendar = calendarWeeks.map((week, weekIndex) => (
        <div className="calendar-week" key={`week-${weekIndex}`}>
          {week.map(({ month, day }, dayIndex) => {
            const index = weekIndex * 7 + dayIndex;
            const isNewMonth = index === 0 || calendarDays[index - 1].month !== month;
            const isToday =
              today.getMonth() === month && today.getDate() === day && today.getFullYear() === year;

            // Find events for the current day
            const eventForDay = events.filter((event) => {
              const eventDate = new Date(event.startDate);
              return (
                eventDate.getFullYear() === year &&
                eventDate.getMonth() === month &&
                eventDate.getDate() === day
              );
            });

            return (
              <Box
                key={`${month}-${day}`}
                ref={(el) => (dayRefs.current[index] = el)}
                data-month={month}
                data-day={day}
                onClick={() => handleDayClick(day, month, year)}
                className={`calendar-day ${isToday ? 'today' : ''} ${
                  month < 0 ? 'past-month' : 'current-month'
                }`}
              >
                <span
                  className={`day-number ${isToday ? 'today' : ''} ${
                    month < 0 ? 'past-month' : 'current-month'
                  }`}
                >
                  {day}
                </span>
                {isNewMonth && <span className="month-label">{monthNames[month]}</span>}

                <Box sx={{ mt: '25px', ml: 0.2 }}>
                  {/* Render events inside the respective date block */}
                  {eventForDay?.length > 0 && (
                    <div className="event-list">
                      {eventForDay?.slice(0, 3).map((event, eventIndex) => (
                        <Box sx={{ display: 'flex' }} key={eventIndex}>
                          <Box
                            sx={{
                              p: '2px 6px',
                              marginTop: '2px',
                              marginBottom: '2px',
                              backgroundColor: event.type,
                              borderRadius: '3px 0px 0px 3px'
                            }}
                          ></Box>
                          <div
                            key={eventIndex}
                            className="event"
                            style={{ backgroundColor: event.stage }}
                          >
                            <Tooltip title={eventIndex + 1 + '. ' + event.title}>
                              {eventIndex + 1 + '. ' + event.title}
                            </Tooltip>
                          </div>{' '}
                        </Box>
                      ))}
                    </div>
                  )}
                  {eventForDay.length > 3 && (
                    <Tooltip
                      sx={{
                        backgroundColor: 'whitesmoke',
                        width: '250px',
                        padding: '8px',
                        borderRadius: '4px',
                        boxShadow: 'none',
                        border: 'none'
                      }}
                      title={
                        eventForDay?.length > 0 && (
                          <div
                            // className="event-list"
                            style={{
                              backgroundColor: 'whitesmoke',
                              width: '250px',
                              padding: '8px',
                              borderRadius: '4px',
                              boxShadow: 'none',
                              border: 'none'
                            }}
                          >
                            {eventForDay?.map((event, eventIndex) => (
                              <Box sx={{ display: 'flex' }} key={eventIndex}>
                                <Box
                                  sx={{
                                    p: '2px 6px',
                                    marginTop: '2px',
                                    marginBottom: '2px',
                                    backgroundColor: event.type,
                                    borderRadius: '3px 0px 0px 3px'
                                  }}
                                ></Box>
                                <div
                                  key={eventIndex}
                                  className="event"
                                  style={{ backgroundColor: event.stage }}
                                >
                                  {eventIndex + 1 + '. ' + event.title}
                                </div>
                              </Box>
                            ))}
                          </div>
                        )
                      }
                    >
                      <Typography
                        sx={{
                          fontSize: '12px',
                          fontWeight: 550,
                          color: 'blue',
                          mb: '3px',
                          ml: '8px'
                        }}
                      >
                        + {eventForDay.length - 3} more
                      </Typography>
                    </Tooltip>
                  )}
                </Box>
              </Box>
            );
          })}
        </div>
      ));

      return calendar;
    }, [year, events]);

    const [viewBy, setViewBy] = useState(' ');
    const [showStatusBy, setShowStatusBy] = useState(' ');
    const { viewUserData } = useUserStore();
    const userDetail = JSON.parse(localStorage.getItem('user-storage')).state;
    const dummyData = [
      {
        complianceId: 101,
        complianceName: 'Data Protection',
        regulatoryBody: 'GDPR',
        regulatoryCategory: 'Privacy',
        department: 'IT',
        complianceType: 'Mandatory',
        riskOwner: 'John Doe',
        startDate: '2024-01-10',
        dueDate: '2024-06-10',
        periodicity: 'Annual',
        status: 'Active'
      },
      {
        complianceId: 102,
        complianceName: 'Financial Audit',
        regulatoryBody: 'SEC',
        regulatoryCategory: 'Finance',
        department: 'Finance',
        complianceType: 'Mandatory',
        riskOwner: 'Jane Smith',
        startDate: '2024-02-15',
        dueDate: '2024-07-15',
        periodicity: 'Bi-Annual',
        status: 'Pending'
      },
      {
        complianceId: 103,
        complianceName: 'Environmental Safety',
        regulatoryBody: 'EPA',
        regulatoryCategory: 'Health & Safety',
        department: 'Operations',
        complianceType: 'Voluntary',
        riskOwner: 'Alex Johnson',
        startDate: '2024-03-01',
        dueDate: '2024-09-01',
        periodicity: 'Quarterly',
        status: 'Completed'
      },
      {
        complianceId: 104,
        complianceName: 'Cybersecurity Standards',
        regulatoryBody: 'ISO 27001',
        regulatoryCategory: 'Security',
        department: 'Cybersecurity',
        complianceType: 'Mandatory',
        riskOwner: 'Emma Wilson',
        startDate: '2024-04-05',
        dueDate: '2024-10-05',
        periodicity: 'Annual',
        status: 'Overdue'
      },
      {
        complianceId: 105,
        complianceName: 'Workplace Safety',
        regulatoryBody: 'OSHA',
        regulatoryCategory: 'Safety',
        department: 'HR',
        complianceType: 'Mandatory',
        riskOwner: 'David Brown',
        startDate: '2024-05-20',
        dueDate: '2024-11-20',
        periodicity: 'Semi-Annual',
        status: 'In Progress'
      }
    ];
    console.log(viewUserData, userDetail, 'viewuser');

    const [openAddnew, setAddNew] = useState(false);
    const [selectedType, setSelectedType] = useState('manual');

    const handleRadioChange = (event) => {
      setSelectedType(event.target.value);
    };
    return (
      <div className="calendar-container">
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            p: 1.5
          }}
        >
          <Box>
            <Tooltip title="Add">
              <IconButton
                className="squareIconButton"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  if (userDetail.accessName.includes('Auditor'))
                    navigate('/audit/new-audit-schedule');
                  else if (userDetail.accessName.includes('Reviewer'))
                    navigate('/review/new-audit-schedule');
                  // setAddNew(true);
                }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Re-assign">
              <IconButton
                className="squareIconButton "
                style={{ cursor: 'pointer', marginLeft: 10 }}
                onClick={() => {
                  if (userDetail.accessName.includes('Auditor'))
                    navigate('/audit/new-audit-schedule');
                  else if (userDetail.accessName.includes('Reviewer'))
                    navigate('/review/new-audit-schedule');
                  // setAddNew(true);
                }}
              >
                <AssignmentReturnIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Export">
              <IconButton
                className="squareIconButton"
                style={{ cursor: 'pointer', marginLeft: 10 }}
                onClick={() => {
                  if (userDetail.accessName.includes('Auditor'))
                    navigate('/audit/new-audit-schedule');
                  else if (userDetail.accessName.includes('Reviewer'))
                    navigate('/review/new-audit-schedule');
                  // setAddNew(true);
                }}
              >
                <ExitToAppIcon />
              </IconButton>
            </Tooltip>
            <Dialog open={openAddnew} onClose={(e) => setAddNew(false)} fullWidth>
              <DialogTitle className="popupTitle">
                <Typography variant="h6">Select type</Typography>
                <IconButton onClick={() => setAddNew(false)} size="small">
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent dividers>
                <FormControl
                  sx={{ display: 'flex', gap: '10px', flexDirection: 'row', alignItems: 'center' }}
                >
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={selectedType}
                    onChange={handleRadioChange}
                    sx={{ my: '10px' }}
                  >
                    <FormControlLabel
                      value="regulation"
                      control={<Radio />}
                      label="From Regulation"
                    />
                    <FormControlLabel value="manual" control={<Radio />} label="Manual" />
                  </RadioGroup>
                </FormControl>{' '}
                {selectedType == 'regulation' && (
                  <Box>
                    <Select
                      value={selectedRegulation}
                      onChange={(e) => setSelectedRegulation(e.target.value)}
                      size="small"
                    >
                      <MenuItem value=" ">Select Regulation</MenuItem>
                      <MenuItem value="1">Cards Statistics</MenuItem>
                      <MenuItem value="2">Prepaid Payment Instrument (PPI) Statistics </MenuItem>
                      <MenuItem value="3">Cards Statistics</MenuItem>
                      <MenuItem value="4">Form - B </MenuItem>
                      <MenuItem value="5">Pre-paid Payment Instrument Statistics </MenuItem>
                      <MenuItem value="6">Usage of Credit & debit cards at ATM & POS</MenuItem>
                    </Select>
                  </Box>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={() => navigate('addCompliance')}>Submit</Button>
              </DialogActions>
            </Dialog>
          </Box>
          <Box
            sx={{
              // width: '50%',
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '10px',
              p: 1.5
            }}
          >
            <>
              <Typography>View By: </Typography>

              <Select
                size="small"
                value={viewBy}
                onChange={(e) => setViewBy(e.target.value)}
                sx={{
                  width: '130px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                <MenuItem value=" ">{'Select View'}</MenuItem>
                {[
                  'All',
                  'By department',
                  'By Owner',
                  'By Category',
                  'By Type',
                  'By Domain',
                  'By Regulatory Body'
                ].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </>
            <>
              <Typography>Show by Status: </Typography>

              <Select
                size="small"
                value={showStatusBy}
                onChange={(e) => setShowStatusBy(e.target.value)}
                sx={{
                  width: '130px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }} // Fixed width
              >
                <MenuItem value=" ">{'Select Show Status'}</MenuItem>
                {['All', 'Completed', 'In-progress', 'Pending', 'Upcoming'].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </>

            <IconButton
              className="squareIconButton"
              style={{ cursor: 'pointer' }}
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            >
              {viewMode == 'grid' ? <BsList size={18} /> : <BsGrid size={18} />}
            </IconButton>
          </Box>
        </Box>
        {viewMode === 'grid' ? (
          <>
            <div
              className="calendar-header"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: 0
              }}
            >
              <div>
                <Select value={selectedMonth} onChange={handleMonthChange} size="small">
                  <MenuItem value=" ">Select Month</MenuItem>
                  {monthOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
                <button
                  onClick={handleTodayClick}
                  className="today-btn"
                  style={{ marginLeft: '8px', marginRight: '8px', padding: '10px' }}
                >
                  Today
                </button>
              </div>
              <div className="year-navigation">
                <IconButton onClick={handlePrevYear} sx={{ height: '30px', width: '30px' }}>
                  <ArrowLeft />
                </IconButton>
                <Typography sx={{ fontSize: '20px', fontWeight: 550 }}>{year}</Typography>
                <IconButton onClick={handleNextYear} sx={{ height: '30px', width: '30px' }}>
                  <ArrowRight />
                </IconButton>
              </div>{' '}
            </div>{' '}
            <div className="weekdays">
              {daysOfWeek.map((day) => (
                <div key={day} className="weekday">
                  {day}
                </div>
              ))}
            </div>
            <div
              className="hide-scrollbar"
              style={{ padding: '10px', height: '50vh', overflowY: 'scroll' }}
            >
              {generateCalendar}
            </div>{' '}
          </>
        ) : (
          <Scrollbar>
            <TableContainer
              sx={{
                minWidth: 800,
                height: '68vh',
                overflowX: 'scroll',
                backgroundColor: '#fff',
                marginTop: '15px'
              }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>
                      <strong> Compliance ID </strong>{' '}
                    </StyledTableCell>
                    <StyledTableCell>Compliance Name </StyledTableCell>
                    <StyledTableCell>Regulatory Body </StyledTableCell>
                    <StyledTableCell>Regulatory Category </StyledTableCell>
                    <StyledTableCell>Department</StyledTableCell>
                    <StyledTableCell>Compliance Type</StyledTableCell>
                    <StyledTableCell>Risk Owner</StyledTableCell>
                    <StyledTableCell>Start Date</StyledTableCell>
                    <StyledTableCell>Due Date</StyledTableCell>
                    <StyledTableCell>Periodicity</StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                    <StyledTableCell width={100}>ACTION</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dummyData.map((row) => (
                    <TableRow key={row.complianceId}>
                      <StyledTableCell>
                        <Typography variant="body2" className="colorBlue">
                          {row.complianceId}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Typography variant="body2" className="colorBlue">
                          {row.complianceName}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell>{row.regulatoryBody}</StyledTableCell>
                      <StyledTableCell>{row.regulatoryCategory}</StyledTableCell>
                      <StyledTableCell>{row.department}</StyledTableCell>
                      <StyledTableCell>{row.complianceType}</StyledTableCell>
                      <StyledTableCell>{row.riskOwner}</StyledTableCell>
                      <StyledTableCell>{row.startDate}</StyledTableCell>
                      <StyledTableCell>{row.dueDate}</StyledTableCell>
                      <StyledTableCell>{row.periodicity}</StyledTableCell>
                      <StyledTableCell>{row.status}</StyledTableCell>
                      <StyledTableCell>
                        <IconButton className="squareIconButton" style={{ cursor: 'pointer' }}>
                          <FiEye />
                        </IconButton>
                      </StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
                {/* <Pagination
                          count={Math.ceil(
                            (plannedAudit.filter((ele) => {
                              if (
                                (ele?.auditApproval == 'S' && ele?.submitFlag == 'N') ||
                                ele?.auditApproval == 'F'
                              ) {
                                return true;
                              } else {
                                return false;
                              }
                            })?.length -
                              1) /
                              itemsPerPage
                          )}
                          page={page + 1}
                          onChange={handlePageChange}
                          sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
                        /> */}
              </Table>
            </TableContainer>
          </Scrollbar>
        )}
      </div>
    );
  }
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [viewMode, setViewMode] = useState('grid');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Page title="Calender">
      {' '}
      <Container maxWidth={false}>
        <Box pt={3}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            className="pageHeading"
          >
            <PageTitle info="Calender" />
            <Box>
              <BrudCrumbs />
            </Box>
          </Stack>
        </Box>

        <Box sx={{ paddingBottom: '50px', position: 'relative' }}>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <Grid container spacing={3} sx={{ padding: 0.8 }}>
              <Grid item xs={12} md={6} lg={2}>
                <Box
                  sx={{
                    backgroundColor: '#FFEB3B',
                    color: 'black',
                    padding: 2,
                    borderRadius: 2,
                    boxShadow: 3,
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}
                >
                  <Typography> Upcoming</Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {2}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} lg={2}>
                <Box
                  sx={{
                    backgroundColor: '#9C27B0',
                    color: 'black',
                    padding: 2,
                    borderRadius: 2,
                    boxShadow: 3,
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}
                >
                  <Typography>Due Today</Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {0}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} lg={2}>
                <Box
                  sx={{
                    backgroundColor: '#2196F3',
                    color: 'black',
                    padding: 2,
                    borderRadius: 2,
                    boxShadow: 3,
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}
                >
                  <Typography>Pending</Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {2}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} lg={2}>
                <Box
                  sx={{
                    backgroundColor: '#F44336',
                    color: 'black',
                    padding: 2,
                    borderRadius: 2,
                    boxShadow: 3,
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}
                >
                  <Typography>Over Due</Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {3}
                  </Typography>
                </Box>
              </Grid>{' '}
              <Grid item xs={12} md={6} lg={2}>
                <Box
                  sx={{
                    backgroundColor: '#4CAF50',
                    color: 'black',
                    padding: 2,
                    borderRadius: 2,
                    boxShadow: 3,
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}
                >
                  <Typography>Completed</Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {5}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} lg={2}>
                <Box
                  sx={{
                    backgroundColor: '#D32F2F',
                    color: 'black',
                    padding: 2,
                    borderRadius: 2,
                    boxShadow: 3,
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}
                >
                  <Typography>Rejected</Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {4}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>{' '}
          {/* <Box sx={{ my: 2 }}>
            <Tabs
              value={value}
              onChange={handleChange}
              className="tabOuter"
              aria-label="basic tabs example"
              classes={{ indicator: 'tabIndicator' }}
            >
              <Tab
                label="Plan"
                // {...a11yProps(0)}
                classes={{ selected: 'tabSelected', root: 'tabDefault' }}
              />
              <Tab
                label="Re-assign"
                // {...a11yProps(0)}
                classes={{ selected: 'tabSelected', root: 'tabDefault' }}
              />
              <Tab
                label="Export"
                // {...a11yProps(0)}
                classes={{ selected: 'tabSelected', root: 'tabDefault' }}
              />
            </Tabs>
          </Box> */}
          <ContinuousCalendar />
          <Box
            className="footerBox"
            sx={{
              mb: '35px'
            }}
          >
            <div
              style={{
                paddingLeft: '200px',
                display: 'flex',
                justifyContent: 'center',
                gap: '10px'
              }}
            >
              {[
                { color: '#FF5722', label: 'Return' },
                { color: '#3F51B5 ', label: 'Process' },
                { color: '#D97706 ', label: 'Communication' },
                { color: '#9E9E9E ', label: 'External' }
              ].map((item, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: item.color
                    }}
                  />
                  <Typography variant="body2">{item.label}</Typography>
                </Box>
              ))}
            </div>
          </Box>{' '}
        </Box>
      </Container>
    </Page>
  );
}
