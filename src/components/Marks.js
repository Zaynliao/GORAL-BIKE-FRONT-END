import { Marker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import Twd97toWsg84 from './Twd97toWsg84';
import { useContext } from 'react';
import { MapDataValue } from '../layout/Map/index';

// MARKS ICONS圖案設定
function GetIcon(_iconSize) {
  return L.icon({
    iconUrl: require('../images/pin.png'),
    iconSize: [_iconSize, _iconSize],
  });
}

export default function Mark() {
  const Data = useContext(MapDataValue);

  return (
    <>
      {/* 渲染所有座標位置，並定義各個MARKS內容 */}
      {Data.filterDataApi.map((value, index) => {
        // console.log(value['起點X坐標'], value['起點Y坐標']);
        let dataAxis = Twd97toWsg84(value['起點X坐標'], value['起點Y坐標']);

        return (
          <div key={value['編號']}>
            <Marker
              ref={Data.markerRef}
              position={[dataAxis[1], dataAxis[0]]}
              icon={GetIcon(30)}
              eventHandlers={{
                click(e) {
                  // 轉換座標值賦予
                  Data.setGetName(value['林道名稱']);
                  const position = [dataAxis[1], dataAxis[0]];
                  // 父層回傳值設定
                  Data.setPosition(position);
                  Data.setZoom(14);
                  Data.setShow(false);
                },
              }}
            >
              {/* click 顯示物件 */}
              <Popup>{value['林道名稱']}</Popup>
              {/* hover 顯示物件 */}
              <Tooltip>{value['林道名稱']}</Tooltip>
            </Marker>
          </div>
        );
      })}
    </>
  );
}
