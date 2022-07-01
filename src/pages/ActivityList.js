import TopSection from '../components/TopSection';
import CourseAside from '../components/CourseAside';
import Pagination from '../components/Pagination';
import RowCard from '../components/Cards/RowCard';
import ColCard from '../components/Cards/ColCard';
import TopSort from '../components/TopSort';
import axios from 'axios';
import { useState, useEffect, createContext } from 'react';
import { API_URL, IMAGE_URL } from '../utils/config';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

// 匯出 ActivityValue 的 Context (景況)
export const ActivityValue = createContext();

export default function ActivityList() {
  // ---------------------------------------------- 初始值

  const [data, setData] = useState([]); // 主資料
  const [page, setPage] = useState(1); // 當前頁數
  const [lastPage, setLastPage] = useState(1); // 總頁數
  const [cardStyle, setCardStyle] = useState('row'); // 卡片排列方式
  const [searchWord, setSearchWord] = useState(''); // 關鍵字變動
  const [search, setSearch] = useState(''); // 關鍵字篩選
  const [statu, setStatu] = useState(''); // 狀態篩選
  const [originPrice, setOriginPrice] = useState(''); // 價錢範圍
  const [price, setPrice] = useState(''); // slider 價錢變動
  const [priceSubmit, setPriceSubmit] = useState(''); // 價錢篩選
  const [originPerson, setOriginPerson] = useState(''); // 人數範圍
  const [person, setPerson] = useState(''); // slider 人數變動
  const [personSubmit, setPersonSubmit] = useState(''); // 人數篩選
  const [category, setCategory] = useState([1, 2, 3, 4]); // 課程難度篩選
  const [startDate, setStartDate] = useState(new Date()); // 最早日期
  const [startDateSubmit, setStartDateSubmit] = useState(''); // 最早日期篩選
  const [endDate, setEndDate] = useState(new Date()); // 最晚日期
  const [endDateSubmit, setEndDateSubmit] = useState(''); // 最晚日期篩選
  const [sortMethod, setSortMethod] = useState('newSort'); // 排序

  // ------------------------------------------- 固定值

  const [categoryLabel, setCategoryLabel] = useState([]); // 難度分類
  const [state, setState] = useState([]); // 狀態分類
  const [isLoading, setIsLoading] = useState(true); // 載入狀態
  // ------------------------------------------- 跟後端要資料
  useEffect(() => {
    let getData = async () => {
      try {
        let response = await axios.get(`${API_URL}/activity/`, {
          params: {
            page: page,
            statu: statu,
            priceSubmit: priceSubmit,
            personSubmit: personSubmit,
            category: category,
            sortMethod: sortMethod,
            startDateSubmit: startDateSubmit,
            endDateSubmit: endDateSubmit,
            search: search,
          },
        });
        setData(response.data.data);
        setLastPage(response.data.pagination.lastPage);
      } catch (e) {
        console.error(e);
      }
    };
    getData();
  }, [
    page,
    statu,
    priceSubmit,
    personSubmit,
    category,
    sortMethod,
    startDateSubmit,
    endDateSubmit,
    search,
  ]);

  useEffect(() => {
    let getData = async () => {
      try {
        let response = await axios.get(`${API_URL}/activity/`);
        setIsLoading(true);
        setPrice([
          response.data.priceRange.sqlMinPrice,
          response.data.priceRange.sqlMaxPrice,
        ]);
        setPerson([
          response.data.personRange.sqlMinPerson,
          response.data.personRange.sqlMaxPerson,
        ]);
        setOriginPrice([
          response.data.priceRange.sqlMinPrice,
          response.data.priceRange.sqlMaxPrice,
        ]);
        setOriginPerson([
          response.data.personRange.sqlMinPerson,
          response.data.personRange.sqlMaxPerson,
        ]);
        setState(response.data.stateGroup);
        setCategoryLabel(response.data.categoryGroup);
        setStartDate(response.data.dateRange.finalStartDate);
        setEndDate(response.data.dateRange.finalEndDate);
        setTimeout(() => {
          setIsLoading(false);
        }, 1300);
      } catch (e) {
        console.error(e);
      }
    };
    getData();
  }, []);

  const courseItems = [];

  data.map((v, i) => {
    const newDate = data[i].activity_date.split('T').shift();
    if (cardStyle === 'row') {
      courseItems.push(
        <RowCard
          key={i}
          courseId={data[i].activity_id}
          image={`${IMAGE_URL}/activity/${data[i].activity_pictures}`}
          score={data[i].activity_score}
          like={false}
          title={data[i].activity_name}
          price={data[i].activity_fee}
          time={newDate}
          count={data[i].activity_persons}
          statu={data[i].activity_status_name}
          text={data[i].activity_content_introduction}
          venue={data[i].venue_name}
          datailLink={`/activity/${data[i].activity_id}`}
        />
      );
    } else {
      courseItems.push(
        <ColCard
          key={i}
          courseId={data[i].activity_id}
          image={`${IMAGE_URL}/activity/${data[i].activity_pictures}`}
          like={false}
          title={data[i].activity_name}
          price={data[i].activity_fee}
          time={newDate}
          count={data[i].activity_persons}
          statu={data[i].activity_status_name}
          text={data[i].activity_content_introduction}
          venue={data[i].venue_name}
          datailLink={`/activity/${data[i].activity_id}`}
        />
      );
    }

    return 0;
  });

  const skeletonCount = 9;
  const skeletonGroup = [];
  for (let i = 0; i < skeletonCount; i++) {
    skeletonGroup.push(
      <div
        key={i}
        className="project-row-card card mb-3 shadow border-0 rounded-0 px-0"
        style={{ height: '14.75rem', width: '63rem' }}
      >
        <div className="d-flex">
          <div className="col-4">
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={310}
              height={236}
            />
          </div>
          <Stack className="col-7" spacing={0.5}>
            <div className="d-grid pt-3">
              <Skeleton
                animation="wave"
                variant="text"
                width={210}
                height={50}
              />
              <Skeleton
                animation="wave"
                variant="text"
                width={339}
                height={50}
              />
              <Skeleton
                animation="wave"
                variant="text"
                width={638}
                height={110}
              />
            </div>
          </Stack>
        </div>
      </div>
    );
  }
  const VALUE = {
    statu,
    setStatu,
    priceSubmit,
    setPriceSubmit,
    personSubmit,
    setPersonSubmit,
    category,
    setCategory,
    startDate,
    startDateSubmit,
    setStartDateSubmit,
    endDate,
    endDateSubmit,
    setEndDateSubmit,
    state,
    categoryLabel,
    price,
    setPrice,
    person,
    setPerson,
    setSearch,
    searchWord,
    setSearchWord,
    setPage,
    originPrice,
    originPerson,
    isLoading,
  };
  return (
    <>
      <ActivityValue.Provider value={VALUE}>
        <TopSection
          title="活動"
          bg={`${IMAGE_URL}/activity/ActivityBanner.jpg`}
        />
        <div className="container">
          <div className="row gx-5 justify-content-center my-5 flex-nowrap">
            {/* -----------------------------左區塊 */}
            <div className="col-auto d-none d-xl-block">
              {/* 邊攔 */}
              <CourseAside contextValue={ActivityValue} />
            </div>
            {/* -----------------------------右區塊 */}
            <div className="col-12 col-xl-9">
              {/* 排序 */}
              <TopSort
                cardStyle={cardStyle}
                setCardStyle={setCardStyle}
                sortMethod={sortMethod}
                setSortMethod={setSortMethod}
                contextValue={ActivityValue}
              />
              {/* 卡片清單 */}
              {isLoading ? (
                skeletonGroup
              ) : (
                <>
                  {data.length > 0 ? (
                    <>
                      <div
                        className={
                          cardStyle === 'col'
                            ? 'd-flex flex-wrap mt-2'
                            : 'mt-2 mb-5'
                        }
                      >
                        {courseItems}
                      </div>
                      <div className="d-flex justify-content-center">
                        <Pagination
                          page={page}
                          setPage={setPage}
                          lastPage={lastPage}
                        />
                      </div>
                    </>
                  ) : (
                    <div
                      className="row justify-content-center align-items-center text-content"
                      style={{ width: '63rem', height: '75%' }}
                    >
                      找不到課程，請調整篩選條件。
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </ActivityValue.Provider>
    </>
  );
}
