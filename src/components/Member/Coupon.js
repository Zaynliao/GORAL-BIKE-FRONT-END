import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { API_URL, IMAGE_URL } from '../../utils/config';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

export default function Coupon({ userData }) {
  const [data, setData] = useState([]);
  const [key, setKey] = useState(1);

  useEffect(() => {
    let getData = async () => {
      try {
        let response = await axios.get(`${API_URL}/member/coupon`, {
          params: {
            userId: userData.userId,
            couponsIs: key,
          },
        });
        setData(response.data.data);
      } catch (e) {
        console.error(e);
      }
    };
    getData();
  }, [userData.userId, key]);

  const courseItems = [];

  data.map((v, i) => {
    const newDate = data[i].coupon_expiry_date.split('T').shift();
    courseItems.push(
      <Row className="text-primary text-center py-4 mx-0 coupon-list" key={i}>
        <Col sm={3} className="fw-bold">
          {data[i].coupon_name}
        </Col>
        <Col sm={4} className="text-start">
          {data[i].coupon_content}
        </Col>
        <Col sm={3}>{newDate}</Col>
        <Col sm={1}>
          {data[i].coupons_is === 0 ? (
            <div className="badge bg-line fs-6 fw-light">已使用</div>
          ) : (
            <div className="badge bg-secondary fs-6 fw-light">未使用</div>
          )}
        </Col>
      </Row>
    );
    return 0;
  });

  return (
    <div className="mb-5">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="coupon-list-tab mb-3"
      >
        <Tab eventKey="1" title="未使用">
          <Row className="bg-primary text-white text-center py-2 order-title px-5">
            <Col sm={3}>優惠券名稱</Col>
            <Col sm={4}>使用說明</Col>
            <Col sm={3}>使用期限</Col>
            <Col sm={1}>使用狀態</Col>
          </Row>
          <Row className="bg-white text-primary text-center py-2 order-title px-5">
            {courseItems.length > 0 ? (
              courseItems
            ) : (
              <div className="d-grid justify-content-center align-items-center link-content h-auto pt-5">
                <div className="d-flex justify-content-center mt-3">
                  <p>尚未到發放優惠券的時期，敬請期待！</p>
                </div>
                <img
                  src={`${IMAGE_URL}/no-data/green.svg`}
                  alt=""
                  className="mb-5"
                />
              </div>
            )}
          </Row>
        </Tab>
        <Tab eventKey="0" title="已使用">
          <Row className="bg-primary text-white text-center py-2 order-title px-5">
            <Col sm={3}>優惠券名稱</Col>
            <Col sm={4}>使用說明</Col>
            <Col sm={3}>使用期限</Col>
            <Col sm={1}>使用狀態</Col>
          </Row>
          <Row className="bg-white text-primary text-center py-2 order-title px-5">
            {courseItems.length > 0 ? (
              courseItems
            ) : (
              <div className="d-grid justify-content-center align-items-center link-content h-auto pt-5">
                <div className="d-flex justify-content-center mt-3">
                  <p>尚未使用過優惠券，到</p>
                  <p
                    className="mx-1 link-highlight"
                    onClick={() => {
                      setKey(1);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    未使用頁
                  </p>
                  <p>看看有什麼優惠券！</p>
                </div>
                <img
                  src={`${IMAGE_URL}/no-data/green.svg`}
                  alt=""
                  className="mb-5"
                />
              </div>
            )}
          </Row>
        </Tab>
      </Tabs>
    </div>
  );
}
