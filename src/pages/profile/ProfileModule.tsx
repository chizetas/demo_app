import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import { useSelector } from "../../redux/hooks"
import { Card, Row, Col, Typography, Divider } from 'antd';
import styles from "./ProfileModule.module.css"
import { useTranslation} from 'react-i18next'

export const ProfileModule = () => {
  const loading = useSelector(s => s.profile.loading)
  const error = useSelector(s => s.profile.error)
  const data = useSelector(s => s.profile.data)
  const dispatch = useDispatch();
  const history = useHistory();

  console.log(data)

  const { Text } = Typography

  const { t } = useTranslation()
  return (
    <Card title="Address">
      <Row gutter={[16, 16]} justify={'center'}>
        {
          data.data.map(d => {

            return (<Col span={8} >
              <Card key={d.id} bordered={true} bodyStyle={{ padding: 10, height: 150, position: 'relative' }}>
                <Text strong>{d.shipToName}</Text>

                <li>{d.shipToAddress1}</li>
                <li>{d.shipToCity}, {d.shipToState} {d.shipToZipCode}</li>
                {d.telephoneNo ? (
                  <li>Phone number: {d.telephoneNo}</li>
                ) : ("")

                }

                <div className={styles['card-bottom-link']}>
                  <a href="#" style ={{marginLeft: 20}}>{t("profile.edit")}</a>
                  <Divider type="vertical" style ={{marginLeft: 20}} />
                  <a href="#" style ={{marginLeft: 20}}>{t("profile.remove")}</a>
                  <Divider type="vertical" style ={{marginLeft: 20}} />
                  <a href="#" style ={{marginLeft: 20}}>{t("profile.default")}</a>
                </div>
              </Card>
            </Col>)
          })
        }
      </Row>
    </Card>
  )

}