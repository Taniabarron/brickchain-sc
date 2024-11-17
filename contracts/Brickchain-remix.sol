// SPDX-License-Identifier: UNLICENSED
pragma abicoder v2;
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import 'hardhat/console.sol';

contract Brickchain is ERC721URIStorage, Pausable, Ownable, Initializable {
  using SafeERC20 for IERC20;

  struct PropertyInfo {
    string name;
    uint price;
    address asset;
    string tokenUri;
    uint totalAmount;
    address seller;
  }

  uint internal nextTokenId;
  mapping(address => bool) public issuers;
  mapping(uint => uint) public tokenIdToPropertyId;
  // 0 is empty, starts in 1
  mapping(uint => PropertyInfo) public propertyInfo;
  uint public propertyInfoLength;
  mapping(uint => uint) public propertyToAmountSelled;
  string public CONTRACT_VERSION;

  event CreateProperty(string indexed name, uint price, address asset, string tokenUri, uint totalAmount);
  event MintByPropertyId(uint indexed tokenId, uint indexed propertyId, string tokenUri);
  event UpdateIssuer(address indexed issuer, bool indexed status);

  modifier onlyIssuer() {
    require(issuers[_msgSender()]);
    _;
  }

  constructor(address initialOwner)
        ERC721("MyToken", "MTK")
        Ownable(initialOwner)
    {}

  function initialize() initializer public {
    _transferOwnership(_msgSender());
    CONTRACT_VERSION = '0.0.1';
  }

  function pause() external onlyOwner {
    _pause();
  }

  function unpause() external onlyOwner {
    _unpause();
  }

  function updateIssuer(address _issuer, bool _status) onlyOwner external {
    issuers[_issuer] = _status;
    emit UpdateIssuer(_issuer, _status);
  }

  function createProperty(PropertyInfo memory _property_info) external whenNotPaused onlyIssuer {
    propertyInfoLength++;
    propertyInfo[propertyInfoLength] = _property_info;
    emit CreateProperty(_property_info.name, _property_info.price, _property_info.asset, _property_info.tokenUri, _property_info.totalAmount);
  }

  function multipleMintByPropertyId(uint[] memory _property_ids, address[] memory _receivers) external whenNotPaused {
    require(_property_ids.length == _receivers.length);
    for (uint256 i = 0; i < _property_ids.length; i++) 
      _mintByPropertyId(_property_ids[i], _receivers[i]);
  }
  
  function _mintByPropertyId(uint _property_id, address _receiver) internal whenNotPaused {
    require(_property_id > 0, 'require valid property id');
    PropertyInfo memory property = propertyInfo[_property_id];
    IERC20(property.asset).safeTransferFrom(_msgSender(), property.seller, property.price);
    _fullMint(_property_id, _receiver);
  }

  function _fullMint(uint property_id, address _to) internal {
    require(propertyToAmountSelled[property_id] < propertyInfo[property_id].totalAmount);
    propertyToAmountSelled[property_id]++;
    tokenIdToPropertyId[nextTokenId] = property_id;
    _mint(_to, nextTokenId);
    _setTokenURI(nextTokenId, propertyInfo[property_id].tokenUri);

    emit MintByPropertyId(nextTokenId, property_id, propertyInfo[property_id].tokenUri);

    nextTokenId++;
  }

  function transfer(address _from, address _to, uint _tokenId) external whenNotPaused {
    require(_from == _msgSender());
    _transfer(_from, _to, _tokenId);
  }
  
  function name() public view virtual override returns (string memory) {
    return "Brickchain";
  }

  function symbol() public view virtual override returns (string memory) {
    return "BRC";
  }

  function ownerOf(uint256 tokenId) public view override(ERC721, IERC721) returns (address owner) {
    owner = _ownerOf(tokenId);
  }

  function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    return super.tokenURI(tokenId);
  }

}