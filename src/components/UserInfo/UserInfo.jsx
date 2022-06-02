import styles from './UserInfo.module.scss';

function UserInfo({ avatarUrl, fullName, additionalText }) {
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={avatarUrl} alt={fullName} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>
          {additionalText.replace('T', ' ').replace('Z', '').split('.')[0]}
        </span>
      </div>
    </div>
  );
}
export default UserInfo;
